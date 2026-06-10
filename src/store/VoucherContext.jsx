import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";
import { makeVoucher } from "./vouchers";
import { VoucherContext } from "./voucherContext";

function normalizeVoucher(voucher) {
  return {
    ...voucher,
    startedAt: voucher.started_at ?? voucher.startedAt,
    expiresAt: voucher.expires_at ?? voucher.expiresAt,
  };
}

export function VoucherProvider({ children }) {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVouchers = useCallback(async () => {
    const { data, error } = await supabase
      .from("vouchers")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) setError(error.message);
    else setVouchers(data.map(normalizeVoucher));
    setLoading(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!mounted) return;
      setLoading(true);
      await fetchVouchers();
    })();
    return () => {
      mounted = false;
    };
  }, [fetchVouchers]);

  const generate = useCallback(async (duration, price, qty) => {
    const newVouchers = Array.from({ length: qty }, () =>
      makeVoucher(duration, price),
    );

    const { data, error } = await supabase
      .from("vouchers")
      .insert(newVouchers)
      .select();

    if (error) {
      setError(error.message);
      return null;
    }
    setVouchers((prev) => [...data.map(normalizeVoucher), ...prev]);
    return data.map(normalizeVoucher);
  }, []);

  const redeem = useCallback(async (code, mac = null) => {
    const { data, error } = await supabase.rpc("redeem_voucher", {
      p_code: code,
      p_mac: mac,
    });

    if (error || !data.success) {
      return { success: false, message: data?.error || error?.message };
    }

    const voucher = normalizeVoucher({
      ...data,
      mac,
    });

    setVouchers((prev) =>
      prev.map((v) =>
        v.code === code
          ? {
              ...v,
              status: "active",
              startedAt: voucher.startedAt,
              expiresAt: voucher.expiresAt,
              started_at: voucher.startedAt,
              expires_at: voucher.expiresAt,
              mac,
            }
          : v,
      ),
    );

    return { success: true, voucher };
  }, []);

  const disconnect = useCallback(async (id) => {
    const { error } = await supabase
      .from("vouchers")
      .update({ status: "expired" })
      .eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }
    setVouchers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: "expired" } : v)),
    );
  }, []);

  const remove = useCallback(async (id) => {
    const { error } = await supabase.from("vouchers").delete().eq("id", id);

    if (error) {
      setError(error.message);
      return;
    }
    setVouchers((prev) => prev.filter((v) => v.id !== id));
  }, []);

  const checkByCode = useCallback(async (code) => {
    const { data, error } = await supabase
      .from("vouchers")
      .select("*")
      .eq("code", code)
      .single();

    if (error) return null;
    return normalizeVoucher(data);
  }, []);

  return (
    <VoucherContext.Provider
      value={{
        vouchers,
        loading,
        error,
        generate,
        redeem,
        disconnect,
        remove,
        checkByCode,
        fetchVouchers,
      }}
    >
      {children}
    </VoucherContext.Provider>
  );
}
