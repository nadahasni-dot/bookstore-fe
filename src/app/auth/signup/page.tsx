"use client";

import SignUpForm from "@/components/auth/signup-form";
import { queryClient } from "@/lib/query-client";
import { getToken } from "@/services/auth";
import { QueryClientProvider } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import React, { useLayoutEffect } from "react";

function SignUp() {
  useLayoutEffect(() => {
    const token = getToken();
    if (token !== "") {
      redirect("/");
    }
  }, []);

  return (
    <div className="flex flex-col justify-center items-center container px-4 md:px-8 flex-grow">
      <h1 className="font-semibold text-2xl">Sign Up</h1>
      <p className="text-sm mt-2 mb-10">
        Enter your name, email, and password below to create your account
      </p>
      <QueryClientProvider client={queryClient}>
        <SignUpForm />
      </QueryClientProvider>
    </div>
  );
}

export default SignUp;
