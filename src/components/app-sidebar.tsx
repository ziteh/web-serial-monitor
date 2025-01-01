import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import ConnectionConfig from "@/components/connection-config";
import TxConfig from "./tx-config";

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
        <SidebarGroup>
          {/* <SidebarGroupLabel>Connection</SidebarGroupLabel> */}
          <ConnectionConfig />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Tx Config</SidebarGroupLabel>
          <TxConfig />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
