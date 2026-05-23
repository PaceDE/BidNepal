"use client";

import { Provider } from "react-redux";
import { store } from "@/redux/store";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/query/queryClient";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}