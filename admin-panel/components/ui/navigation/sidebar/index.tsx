// Main sidebar exports - re-exports all sidebar components
export { SidebarProvider } from "./SidebarProvider";
export { Sidebar } from "./Sidebar";
export {
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  SidebarInput,
  SidebarHeader,
  SidebarFooter,
  SidebarSeparator,
  SidebarContent,
} from "./basic-components";

// Note: Menu components are exported directly from the main sidebar file
// to avoid circular imports. They will be modularized in future iterations.

export { useSidebar } from "./context";
export type { SidebarContext } from "./types";
