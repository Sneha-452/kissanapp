const UserModel = require('../Models/User');
const LandModel = require('../Models/Land');
const CropModel = require('../Models/Crop');

const getProfile = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await UserModel.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found', success: false });
    }

    const [landCount, cropCount, recentLands, recentCrops] = await Promise.all([
      LandModel.countDocuments({ owner: userId }),
      CropModel.countDocuments({ owner: userId }),
      LandModel.find({ owner: userId })
        .sort({ createdAt: -1 })
        .limit(3)
        .select('village district area areaUnit rentAmount rentUnit status'),
      CropModel.find({ owner: userId })
        .sort({ createdAt: -1 })
        .limit(3)
        .select('cropName quantity price qualityGrade location'),
    ]);

    res.status(200).json({
      success: true,
      data: {
        user,
        stats: { landCount, cropCount },
        recentLands,
        recentCrops,
      },
    });
  } catch (err) {
    console.error('getProfile error:', err);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { phone, location, mainCrops, farmArea, soilType, irrigationType } = req.body;

    const updated = await UserModel.findByIdAndUpdate(
      userId,
      { phone, location, mainCrops, farmArea, soilType, irrigationType },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      data: updated,
      message: 'Profile updated successfully',
    });
  } catch (err) {
    console.error('updateProfile error:', err);
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

module.exports = { getProfile, updateProfile };
