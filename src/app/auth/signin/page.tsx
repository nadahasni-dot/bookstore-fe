import React from "react";

import SignInForm from "@/components/auth/signin-form";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AuthProvider from "@/components/auth/auth-provider";

function SignIn() {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  if (token) {
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center container px-4 md:px-8 flex-grow">
      <h1 className="font-semibold text-2xl">Sign In</h1>
      <p className="text-sm mt-2 mb-10">
        Start your session by providing valid credential
      </p>
      <AuthProvider>
        <SignInForm />
      </AuthProvider>
    </div>
  );
}

export default SignIn;
