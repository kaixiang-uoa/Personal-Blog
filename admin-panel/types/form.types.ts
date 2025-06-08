import { z } from "zod";
import { useForm as useReactHookForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Create type-safe form - simplified version
export function useTypedForm<T extends z.ZodType>(
  schema: T, 
  defaultValues: Partial<z.infer<T>> = {}
) {
  return useReactHookForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as any,
  });
}
