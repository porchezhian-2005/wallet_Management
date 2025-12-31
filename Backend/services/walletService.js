import Wallet from "../models/Wallet.js";
import WalletTransaction from "../models/WalletTransaction.js";

export const getOrCreateWallet = async (userId) => {
  let wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    wallet = await Wallet.create({ userId, balance: 0 });
  }
  return wallet;
};

export const creditWalletAmount = async (userId, amount, reason="manual_credit") => {
  const wallet = await getOrCreateWallet(userId);
  wallet.balance += amount;
  await wallet.save();

  await WalletTransaction.create({ userId, type: "credit", amount, reason });
  return wallet;
};

export const debitWalletAmount = async (userId, amount, reason="manual_debit") => {
  const wallet = await getOrCreateWallet(userId);

  if (wallet.balance < amount) {
    throw new Error("Insufficient wallet balance");
  }

  wallet.balance -= amount;
  await wallet.save();

  await WalletTransaction.create({ userId, type: "debit", amount, reason });
  return wallet;
};