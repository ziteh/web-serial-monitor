import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import ConnectionConfig from "@/components/connection-config";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>Web Serial Monitor</SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <ConnectionConfig />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
