"use client";

import type { ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";


export default function Providers({ children }: { children: ReactNode }) {
  return (
    <PlanProvider>
      {children}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#13151b",
            color: "#ffffff",
            border: "1px solid #252932",
          },
          success: { iconTheme: { primary: "#ccff00", secondary: "#000000" } },
        }}
      />
    </PlanProvider>
  );
}