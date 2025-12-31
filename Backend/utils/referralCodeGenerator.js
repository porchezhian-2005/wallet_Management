import { nanoid } from "nanoid";

export const generateReferralCode = () => {
  return nanoid(8).toUpperCase();  
};