"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MINPASS = 8;

export const formSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(MINPASS, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

export type AuthFormValues = z.infer<typeof formSchema>;

export function useLoginForm() {
  const form = useForm<AuthFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: AuthFormValues) {
    console.log("✅ Form submitted:", values);
  }

  return { form, onSubmit };
}
