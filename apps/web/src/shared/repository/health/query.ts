import { useQuery } from "@tanstack/react-query";
import { getHealth } from "./action";

const queryKey = {
  health: ["health"],
};

export const useHealthQuery = () =>
  useQuery({
    queryKey: queryKey.health,
    queryFn: () => getHealth(),
  });
