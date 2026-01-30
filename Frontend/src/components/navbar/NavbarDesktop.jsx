import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserMenu from '@/modules/user/components/UserMenu';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ModeToggle } from '@/components/mode-toggle';
import { useTranslation } from 'react-i18next';
import getNavItems from '@/config/navigation';
import Notification from '@/components/notification/Notification';

const NavbarDesktop = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const NavItems =  getNavItems(t);
  const currentTab = NavItems.find(item => item.url === location.pathname)?.key.toLowerCase();

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6">
        <nav className="hidden md:flex flex-1 items-center justify-center gap-6">
          <Tabs value={currentTab} className="w-fit">
            <TabsList className="inline-flex space-x-6">
              {NavItems.map(item => (
                <TabsTrigger
                  key={item.key}
                  value={item.key.toLowerCase()}
                  asChild
                  className="px-4 py-2"
                >
                  <NavLink to={item.url} className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    <span>{item.title} </span>
                  </NavLink>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </nav>

        <div className="flex items-center gap-4">
          <Notification />
          <ModeToggle />
          <LanguageSwitcher />
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

export default NavbarDesktop;
