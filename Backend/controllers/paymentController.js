import Wallet from "../models/Wallet.js";
import WalletConfig from "../models/WalletConfig.js";
import { debitWalletAmount, getOrCreateWallet } from "../services/walletService.js";

export const checkoutWithWallet = async (req, res) => {
  try {
    const { orderAmount, useWallet, couponCode } = req.body;

    if (!orderAmount || orderAmount <= 0) {
      return res.status(400).json({ message: "Invalid order amount" });
    }

    if (useWallet && couponCode) {
      return res.status(400).json({
        message: "Cannot apply coupon when wallet is used"
      });
    }

    const wallet = await getOrCreateWallet(req.user.id);

    const config = await WalletConfig.findOne();
    const maxPercent = config ? config.maxWalletPercent : 30;

    let walletUsed = 0;
    let payable = orderAmount;

    if (useWallet) {
      const maxWalletUsage = (orderAmount * maxPercent) / 100;
      walletUsed = Math.min(wallet.balance, maxWalletUsage);

      if (walletUsed > 0) {
        await debitWalletAmount(req.user.id, walletUsed, "checkout_payment");
      }

      payable = orderAmount - walletUsed;
    }

    return res.json({
      message: "Checkout processed successfully",
      orderAmount,
      walletUsed,
      payable,
      walletBalanceLeft: wallet.balance - walletUsed,
      couponApplied: couponCode ? couponCode : null
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
