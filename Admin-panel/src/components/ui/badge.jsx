import * as React from "react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "./badge-utils";

function Badge({
  className,
  variant,
  ...props
}) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };