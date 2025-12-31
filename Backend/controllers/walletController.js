import { 
  getOrCreateWallet, 
  creditWalletAmount, 
  debitWalletAmount 
} from "../services/walletService.js";

import WalletTransaction from "../models/WalletTransaction.js";

export const walletBalance = async (req, res) => {
  try {
    const wallet = await getOrCreateWallet(req.user.id);
    res.json({ balance: wallet.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const creditWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const wallet = await creditWalletAmount(req.user.id, amount, "manual_credit");
    res.json({
      message: "Amount credited",
      balance: wallet.balance
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const debitWallet = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ message: "Amount must be greater than 0" });
    }

    const wallet = await debitWalletAmount(req.user.id, amount, "manual_debit");
    res.json({
      message: "Amount debited",
      balance: wallet.balance
    });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const walletHistory = async (req, res) => {
  try {
    const transactions = await WalletTransaction.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .select("type amount reason createdAt"); 

    res.json({
      message: "Wallet transaction history fetched successfully",
      totalTransactions: transactions.length,
      transactions
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
