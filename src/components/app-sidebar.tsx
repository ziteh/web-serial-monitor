import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import ConnectionConfig from "@/components/connection-config";
import { Badge } from "@/components/ui/badge";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <span className="m-2">
          {__APP_NAME__}
          <Badge variant="secondary" className="ml-2 px-1 terminal">
            v{__APP_VERSION__}
          </Badge>
        </span>
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
