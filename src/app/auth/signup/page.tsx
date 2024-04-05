import AuthProvider from "@/components/auth/auth-provider";
import SignUpForm from "@/components/auth/signup-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

function SignUp() {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token");

  if (token) {
    redirect("/");
  }

  return (
    <div className="flex flex-col justify-center items-center container px-4 md:px-8 flex-grow">
      <h1 className="font-semibold text-2xl">Sign Up</h1>
      <p className="text-sm mt-2 mb-10">
        Enter your name, email, and password below to create your account
      </p>
      <AuthProvider>
        <SignUpForm />
      </AuthProvider>
    </div>
  );
}

export default SignUp;
