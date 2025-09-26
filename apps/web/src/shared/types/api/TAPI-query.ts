/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
export type TAPIQuery = Record<
  string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  string | number | boolean | any[] | undefined
>;
