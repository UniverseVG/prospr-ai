"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { toast } from "sonner";

const useFetch = (cb: (...args: any[]) => Promise<any>) => {
  const [data, setData] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fn = async (...args: any[]) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      setError(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      } else {
        setError("An unknown error occurred");
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fn, setData };
};

export default useFetch;
