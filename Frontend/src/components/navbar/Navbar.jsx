import useScreenType from '@/hooks/useScreenType';
import React from 'react';
import NavbarMobile from '@/components/navbar/NavbarMobile';
import NavbarDesktop from '@/components/navbar/NavbarDesktop';
import { SquareTerminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import MAIN_ROUTES from '@/routes/path';
import { config } from '@/config/config';
import Notification from '../Notification';

const Navbar = () => {
  const isMobile = useScreenType(1100);

  return (
    <div className="w-full py-4">
      <div className="mx-auto max-w-7xl rounded-xl border bg-background py-3 shadow-sm px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">

          <Link to={MAIN_ROUTES.DASHBOARD} className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary">
              <SquareTerminal className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold">{config.APP_NAME}</span>
          </Link>

          {isMobile ? <NavbarMobile /> : <NavbarDesktop />}          
        </div>
      </div>
    </div>
  );
};

export default Navbar;
