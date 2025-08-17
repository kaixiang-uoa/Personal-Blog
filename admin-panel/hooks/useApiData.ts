import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useToast } from "@/hooks/ui/use-toast";
import { apiService } from "@/lib/api";
import { errorHandler } from "@/lib/errors";
import { UseApiDataOptions, UseApiDataReturn } from "@/types/hooks";

export function useApiData<T>({
  endpoint,
  params,
  dependencies = [],
  onSuccess,
  onError,
  showToast = true,
  toastMessage = "Failed to load data",
}: UseApiDataOptions<T>): UseApiDataReturn<T> {
  const { toast } = useToast();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Use refs to stabilize function references and prevent infinite loops
  const toastRef = useRef(toast);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // Update refs when props change
  toastRef.current = toast;
  onSuccessRef.current = onSuccess;
  onErrorRef.current = onError;

  // Stabilize params object to prevent infinite loops
  const stableParams = useMemo(() => params, [JSON.stringify(params)]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.get<T>(endpoint, stableParams);

      if (response?.data) {
        setData(response.data);
        onSuccessRef.current?.(response.data);
      } else {
        setData(null);
      }
    } catch (err) {
      const apiError = errorHandler.handle(err);
      setError(apiError);
      onErrorRef.current?.(apiError);

      if (showToast) {
        toastRef.current({
          title: "Error",
          description: toastMessage,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint, stableParams, showToast, toastMessage]);

  useEffect(() => {
    fetchData();
  }, [fetchData, ...dependencies]);

  return {
    data,
    loading,
    error,
    refetch: fetchData,
    setData,
  };
}

// Hook for fetching list data
export function useApiList<T>({
  endpoint,
  params,
  dependencies = [],
  showToast = true,
}: Omit<UseApiDataOptions<T[]>, "onSuccess" | "onError" | "toastMessage"> & {
  showToast?: boolean;
}): UseApiDataReturn<T[]> {
  return useApiData<T[]>({
    endpoint,
    params,
    dependencies,
    showToast,
    toastMessage: "Failed to load list data",
  });
}

// Hook for fetching single resource
export function useApiResource<T>({
  endpoint,
  params,
  dependencies = [],
  showToast = true,
}: Omit<UseApiDataOptions<T>, "onSuccess" | "onError" | "toastMessage"> & {
  showToast?: boolean;
}): UseApiDataReturn<T> {
  return useApiData<T>({
    endpoint,
    params,
    dependencies,
    showToast,
    toastMessage: "Failed to load resource",
  });
}
