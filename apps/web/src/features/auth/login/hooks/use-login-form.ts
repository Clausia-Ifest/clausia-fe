import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "@/shared/repository/auth/query";
import { LoginSchema, type TLoginRequest } from "../../types/schema";

export function useLoginForm() {
  const { isPending, mutate: login } = useLoginMutation();
  const form = useForm<TLoginRequest>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler = form.handleSubmit(async (data) => {
    await login(data);
  });

  return { form, onSubmitHandler, isPending };
}
