"use client";

import { useState } from "react";

export function useDashboard() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return {
    date,
    setDate,
  };
}
