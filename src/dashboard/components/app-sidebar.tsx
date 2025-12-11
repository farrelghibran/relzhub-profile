"use client";
import {
  Calendar,
  ChevronUp,
  Gamepad,
  Home,
  Key,
  LogOutIcon,
  Settings,
  User2,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Key",
    url: "/dashboard/keys",
    icon: Key,
  },
  {
    title: "Status",
    url: "/dashboard/status",
    icon: Calendar,
  },
  {
    title: "Games",
    url: "/dashboard/games",
    icon: Gamepad,
  },
  {
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { data: session } = useSession();
  return (
    <Sidebar variant="sidebar">
      <SidebarHeader>
        <div className="px-2 mt-2">
          <h1 className="font-semibold text-lg">Relz Hub</h1>
          <p className="text-muted-foreground text-sm">Dashboard</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {session?.user!.email}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[var(--radix-dropdown-menu-trigger-width)]"
              >
                <DropdownMenuItem>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      signOut({
                        callbackUrl: "/login",
                      })
                    }
                    className="flex w-full items-center gap-2 p-2 text-start"
                  >
                    <LogOutIcon></LogOutIcon>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
