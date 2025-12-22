import MAIN_ROUTES from "@/routes/path";
import { LayoutDashboardIcon } from "lucide-react";

const getNavItems = (t) => [
  {
    key: 'home',
    title: t('navbar:home'),
    url: MAIN_ROUTES.DASHBOARD,
    icon: LayoutDashboardIcon,
  },
];

export default getNavItems;