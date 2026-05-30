"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query/queryClient";
import { LazyMotion, domAnimation } from "motion/react";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LazyMotion features={domAnimation}>
          {children}
        </LazyMotion>
      </QueryClientProvider>
    </Provider>
  );
}