
import React from 'react';
import { Link } from 'react-router-dom';
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Activity, BarChart, ChartNetwork, Database, Network, Settings, Users, Wifi } from "lucide-react";
import { useIsMobile } from '@/hooks/use-mobile';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col">
          <div className="h-14 border-b flex items-center px-4 md:px-6">
            <SidebarTrigger className="mr-2" />
            <h1 className="text-xl font-semibold text-network-blue-700 truncate">Análise de Redes</h1>
          </div>
          <div className="flex-1 overflow-auto p-3 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const isMobile = useIsMobile();
  
  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Activity,
    },
    {
      title: "Topologia da Rede",
      url: "/topology",
      icon: ChartNetwork,
    },
    {
      title: "Dispositivos",
      url: "/devices",
      icon: Wifi,
    },
    {
      title: "Tráfego",
      url: "/traffic",
      icon: Network,
    },
    {
      title: "Métricas",
      url: "/metrics",
      icon: BarChart,
    },
    {
      title: "Base de Dados",
      url: "/database",
      icon: Database,
    },
    {
      title: "Usuários",
      url: "/users",
      icon: Users,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="h-14 flex items-center px-4">
        <ChartNetwork className="h-6 w-6 text-sidebar-foreground" />
        <span className="ml-2 text-lg font-semibold text-sidebar-foreground">NetAnalytics</span>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild tooltip={isMobile ? undefined : item.title}>
                      <Link to={item.url} className="flex items-center">
                        <IconComponent className="h-5 w-5" />
                        <span className="ml-2">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="py-4 px-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground opacity-70">
          © 2025 NetAnalytics
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default Layout;
