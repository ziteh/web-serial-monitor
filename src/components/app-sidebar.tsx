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
      <SidebarHeader>
        {__APP_NAME__} {__APP_VERSION__}
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <ConnectionConfig />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
