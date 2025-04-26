import { useContext } from "react";
import { AdminContext } from "./admin-utils";

export function useAdminContext() {
  return useContext(AdminContext);
}