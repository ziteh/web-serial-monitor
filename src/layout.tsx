import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1 flex flex-col h-full w-full">
          {/* <SidebarTrigger /> */}
          {children}
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
