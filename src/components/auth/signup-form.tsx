import React from "react";
import { queryUserKey, signUp } from "@/services/auth";
import { toast } from "sonner";
import { AxiosError, AxiosResponse } from "axios";
import { SignInResponse } from "@/types/response/auth";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { queryClient } from "@/lib/query-client";

const formSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().min(4).max(50).email(),
    password: z.string().min(6).max(50),
    repeat_password: z.string().min(6).max(50),
  })
  .superRefine(({ repeat_password, password }, ctx) => {
    if (repeat_password !== password) {
      ctx.addIssue({
        code: "custom",
        path: ["repeat_password"],
        message: "The passwords did not match",
      });
    }
  });

function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      repeat_password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    ...signUp(),
    onSuccess: (res: AxiosResponse<SignInResponse>) => {
      queryClient.invalidateQueries({ queryKey: queryUserKey });

      toast.success("Sign Up success");
      router.push("/auth/signin");
    },
    onError: (res: AxiosError<SignInResponse>) => {
      toast.error(res.response?.data.message || "Sign Up failed");
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-xl w-full"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" type="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="repeat_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Repeat Password"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="lg" type="submit" className="w-full" disabled={isPending}>
          Sign Up
        </Button>
        <div className="flex gap-1 justify-center py-4">
          <p>Already have an account?</p>
          <Link href="/auth/signin" className="text-blue-500">
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default SignUpForm;
