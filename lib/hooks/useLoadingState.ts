import { useState } from "react";

export type LoadingState = "idle" | "loading" | "success" | "error";

export function useLoadingState(initialState: LoadingState = "idle") {
  const [loadingState, setLoadingState] = useState<LoadingState>(initialState);
  const [error, setError] = useState<string | null>(null);

  return {
    loadingState,
    error,
    setLoadingState,
    setError
  };
}
