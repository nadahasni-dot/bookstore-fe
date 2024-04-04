"use client";

import React from "react";
import { ModeToggle } from "@/components/ui/mode-togle";
import CartDropdown from "@/components/cart/cart-dropdown";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";
import ProfileDropdown from "./auth/profile-dropdown";

function Navbar() {
  return (
    <nav className="border-b fixed z-10 dark:bg-slate-900 bg-slate-100 w-full">
      <div className="container px-4 md:px-8 flex justify-between my-4 items-center">
        <h1 className="text-xl font-semibold">Bookstore APP</h1>
        <div className="flex gap-4">
          <ModeToggle />
          <QueryClientProvider client={queryClient}>
            <CartDropdown />
            <ProfileDropdown />
          </QueryClientProvider>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
