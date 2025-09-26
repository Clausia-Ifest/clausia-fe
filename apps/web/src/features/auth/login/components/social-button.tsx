"use client";

import { Button } from "@/shared/components/ui/button";
import { useHealthQuery } from "@/shared/repository/health/query";

export default function SocialButtons() {
  const { refetch } = useHealthQuery();
  return (
    <div className="space-y-3">
      <Button
        className="flex h-10 w-full items-center justify-center gap-2"
        onClick={() => refetch()}
        type="button"
        variant="outline"
      >
        Sign in with Google
      </Button>
      <Button
        className="flex h-10 w-full items-center justify-center gap-2"
        type="button"
        variant="outline"
      >
        Sign in with Facebook
      </Button>
      <Button
        className="flex h-10 w-full items-center justify-center gap-2"
        type="button"
        variant="outline"
      >
        Sign in with Apple
      </Button>
    </div>
  );
}
