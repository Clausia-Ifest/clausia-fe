// dto.ts
/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
export type Contract = {
  id: string;
  human_id: string;
  email: string;
  title: string;
  company: string;
  risk_level: string;
  status: string;
  application_status: string;
  category: string;
  start_date: string;
  end_date: string;
  documents: {
    hash: string;
    url: string;
    category: string;
  }[];
};

export type ContractsResponse = {
  contracts: Contract[];
  pagination: {
    total_data: number;
    total_page: number;
    limit: number;
    page: number;
  };
};
