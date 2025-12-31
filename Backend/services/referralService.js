
import User from "../models/User.js";
import { creditWalletAmount } from "./walletService.js";

export const applyReferralRewards = async (referralCode, newUserId) => {
  if (!referralCode) return;

  const referrer = await User.findOne({ referralCode });
  if (!referrer) return;

  await creditWalletAmount(referrer._id, 500, "referral_reward");
  console.log(`Referral reward credited to ${referrer.email}`);

  await creditWalletAmount(newUserId, 500, "referral_join_bonus");
  console.log("Join bonus credited to the referred user");
};