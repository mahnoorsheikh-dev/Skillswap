import Profile from "../models/profileModel.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.userId });

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({ user: profile });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;

    let profile = await Profile.findOne({ userId });
    if (!profile) {
      profile = new Profile({ userId });
    }

    if (updates.name) profile.name = updates.name;
    if (updates.role) profile.role = updates.role;
    if (updates.email) profile.email = updates.email;
    if (updates.location) profile.location = updates.location;
    if (updates.about) profile.about = updates.about;

    if (updates.skillsOffered) {
      profile.skillsOffered = Array.isArray(updates.skillsOffered)
        ? updates.skillsOffered
        : [updates.skillsOffered];
    }

    if (updates.skillsWanted) {
      profile.skillsWanted = Array.isArray(updates.skillsWanted)
        ? updates.skillsWanted
        : [updates.skillsWanted];
    }

    if (req.file) {
      profile.avatar = req.file.path;
    }

    await profile.save();
    res.status(200).json({ message: "Profile updated successfully", user: profile });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllProfiles = async (req, res) => {
  try {
    const search = req.query.search || "";

    const query = search
      ? {
          $or: [
            { skillsOffered: { $regex: search, $options: "i" } },
            { skillsWanted: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    const profiles = await Profile.find(query).sort({ createdAt: -1 });
    res.status(200).json({ users: profiles });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};