"use client";

import { clearSession, getUser, queryUserKey, signOut } from "@/services/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { PersonIcon, ExitIcon, ArchiveIcon } from "@radix-ui/react-icons";
import { queryClient } from "@/lib/query-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { CommonResponse } from "@/types/common";

function ProfileDropdown() {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: queryUserKey,
    queryFn: () => getUser(),
  });

  const { isPending, mutate } = useMutation({
    ...signOut(),
    onSuccess: () => {
      clearSession();
      queryClient.invalidateQueries({ queryKey: queryUserKey });

      toast.success("Sign Out success");
      router.push("/");
    },
    onError: (res: AxiosError<CommonResponse<null>>) => {
      toast.error(res.response?.data.message || "Sign Out failed");
    },
  });

  if (!data) return <></>;

  const handleSignOut = () => {
    mutate();
  };

  const handleRedirectOrder = () => {
    router.push("/order");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <PersonIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col">
          <p>{data.name}</p>
          <p className="text-sm font-light italic">{data.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Remaining Points (${data.point})</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          onSelect={handleRedirectOrder}
        >
          <p>Your Orders</p>
          <ArchiveIcon />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-between"
          onSelect={handleSignOut}
          disabled={isPending}
        >
          <p>Sign Out</p>
          <ExitIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ProfileDropdown;
