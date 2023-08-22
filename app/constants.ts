import { Code2Icon, CodeIcon, ImageIcon, LayoutDashboardIcon, MessageSquareIcon, MusicIcon, SettingsIcon, VideoIcon } from "lucide-react";
// give type to routes
export interface Route {
  label: string;
  icon: any;
  color: string;
  bgColor: string;
  href: string;
};
export const routes: Route[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboardIcon,
    color: "text-sky-500",
    bgColor: "bg-sky-500/10",
    href: "/dashboard"
  },
  {
    label: "Conversation Tools",
    icon: MessageSquareIcon,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: 'Image Generation',
    icon: ImageIcon,
    href: '/image',
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: 'Video Generation',
    icon: VideoIcon,
    href: '/video',
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
  },    
  {
    label: 'Music Generation',
    icon: MusicIcon,
    href: '/music',
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: 'Code Generation',
    icon: CodeIcon,
    href: '/code',
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
  {
    label: 'Code Conversion',
    icon: Code2Icon,
    href: '/code-convert',
    color: "text-blue-700",
    bgColor: "bg-blue-700/10",
  },
  {
    label: 'Settings',
    icon: SettingsIcon,
    href: '/settings',
    color: "text-white-500",
    bgColor: "bg-white-500/10",
  },
];