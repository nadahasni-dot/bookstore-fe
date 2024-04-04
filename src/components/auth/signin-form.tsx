import React from "react";
import { saveSession, signIn } from "@/services/auth";
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

const formSchema = z.object({
  email: z.string().min(2).max(50).email(),
  password: z.string().min(6).max(50),
});

function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { isPending, mutate } = useMutation({
    ...signIn(),
    onSuccess: (res: AxiosResponse<SignInResponse>) => {
      toast.success("Sign In success");
      saveSession(res.data.data);
      router.push("/");
    },
    onError: (res: AxiosError<SignInResponse>) => {
      toast.error(res.response?.data.message || "Sign In failed");
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
        <Button size="lg" type="submit" className="w-full" disabled={isPending}>
          Sign In with Email
        </Button>
        <div className="flex gap-1 justify-center py-4">
          <p>Do not have any account yet?</p>
          <Link href="/auth/signup" className="text-blue-500">
            Sign Up
          </Link>
        </div>
      </form>
    </Form>
  );
}

export default SignInForm;
