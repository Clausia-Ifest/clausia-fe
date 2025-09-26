"use client";

import Link from "next/link";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useLoginForm } from "../hooks/use-login-form";

export default function LoginForm() {
  const { form, onSubmit } = useLoginForm();

  return (
    <Form {...form}>
      <form className="mb-12 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="-top-2 absolute left-2 bg-white px-1.5 font-extralight text-neutral-500 text-xs">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  className="h-14"
                  placeholder="johnsonde@gmail.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="-top-2 absolute left-2 bg-white px-1.5 font-extralight text-neutral-500 text-xs">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  className="h-14"
                  placeholder="**********"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="m-0 flex items-center space-x-2">
                <FormControl>
                  <Input
                    checked={field.value}
                    className="h-5 w-5 bg-white"
                    id="rememberMe"
                    onChange={field.onChange}
                    type="checkbox"
                  />
                </FormControl>
                <FormLabel
                  className="mb-0 cursor-pointer font-medium text-gray-900 text-sm"
                  htmlFor="rememberMe"
                >
                  Remember me
                </FormLabel>
              </FormItem>
            )}
          />
          <Link
            className="font-medium text-muted-foreground text-sm hover:underline"
            href="/forgot-password"
          >
            Forgot Password?
          </Link>
        </div>
        <Button className="h-12 w-full bg-primary text-white" type="submit">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
