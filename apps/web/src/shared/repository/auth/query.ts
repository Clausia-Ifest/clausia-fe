import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import type { TLoginRequest } from "@/features/auth/types/schema";
import { getRoleRedirectPath } from "@/shared/lib/role-redirect";
import { createSession } from "../session-manager/action";
import { login, logout } from "./action";

const queryKey = {
  auth: ["auth-session"],
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: queryKey.auth,
    mutationFn: (data: TLoginRequest) => login(data),
    onSuccess: async (res) => {
      if (!res.success) {
        toast.error("Gagal Login", {
          description: res.error || res.message,
        });
        return;
      }
      await createSession(res.data.access_token);
      toast.success("Berhasil Login", {
        description: `Selamat datang ${res.data.user.full_name}!`,
      });
      router.push(getRoleRedirectPath(res.data.user.role));
      queryClient.refetchQueries({ queryKey: queryKey.auth });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationKey: queryKey.auth,
    mutationFn: () => logout(),
    onSuccess: () => {
      router.replace("/login");
      queryClient.resetQueries({ queryKey: queryKey.auth });
    },
  });
};
