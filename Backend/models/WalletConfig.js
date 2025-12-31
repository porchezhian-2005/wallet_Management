import mongoose from "mongoose";

const walletConfigSchema = new mongoose.Schema(
  {
    maxWalletPercent: {
      type: Number,
      default: 30   // default 30% wallet usage
    }
  },
  { timestamps: true }
);

export default mongoose.model("WalletConfig", walletConfigSchema);
