import { useContext } from "react";
import { VoucherContext } from "../voucherContext";

export const useVouchers = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useVouchers must be used within a VoucherProvider");
  }
  return context;
};
