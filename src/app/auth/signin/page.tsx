"use client";

import React from "react";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import SignInForm from "@/components/auth/signin-form";

function SignIn() {
  return (
    <div className="flex flex-col justify-center items-center container px-4 md:px-8 flex-grow">
      <h1 className="font-semibold text-2xl">Sign In</h1>
      <p className="text-sm mt-2 mb-10">
        Start your session by providing valid credential
      </p>
      <QueryClientProvider client={queryClient}>
        <SignInForm />
      </QueryClientProvider>
    </div>
  );
}

export default SignIn;
