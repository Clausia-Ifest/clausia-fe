export type ApiResponse<T> =
  | { success: true; data: T; message: string }
  | { success: false; error: string; message: string };

export type BackendResponse<T> = {
  data: T;
  meta: null;
};
