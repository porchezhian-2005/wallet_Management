import WalletConfig from "../models/WalletConfig.js";

export const updateWalletPercent = async (req, res) => {
  try {
    const { maxWalletPercent } = req.body;

    const config = await WalletConfig.findOneAndUpdate(
      {},
      { maxWalletPercent },
      { upsert: true, new: true }
    );

    res.json({
      message: "Wallet spend percentage updated successfully",
      config
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getWalletPercent = async (req, res) => {
  try {
    const config = await WalletConfig.findOne();
    res.json(config || { maxWalletPercent: 30 });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
