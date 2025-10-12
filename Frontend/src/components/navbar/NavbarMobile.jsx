import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import useModal from '@/hooks/useModal';
import { MenuIcon, XIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import UserMenu from '@/modules/user/components/UserMenu';
import { ModeToggle } from '@/components/mode-toggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import getNavItems from '@/config/navigation';

const NavbarMobile = () => {
  const { isOpen, open, close } = useModal();
  const { t } = useTranslation();
  const NavItems =  getNavItems(t);

  return (
    <Sheet open={isOpen} onOpenChange={value => (value ? open() : close())}>
      <SheetTrigger asChild>
        <button
          onClick={open}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition"
        >
          {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72 p-6 sm:px-8">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col space-y-4">
          {NavItems.map(item => (
            <NavLink
              key={item.key}
              to={item.url}
              onClick={close}
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-md ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              <span>{item.title}</span>
            </NavLink>
          ))}

          <hr className="my-4 border-gray-200 dark:border-zinc-700" />

          <div className="flex items-center gap-2">
            <UserMenu />
            <ModeToggle />
            <LanguageSwitcher />
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default NavbarMobile;
