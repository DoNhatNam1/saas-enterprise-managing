"use client";

import { ReactNode } from "react";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const client = new QueryClient();

const AuthProviders = ({ children }: { children: ReactNode }) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};

export default AuthProviders;
