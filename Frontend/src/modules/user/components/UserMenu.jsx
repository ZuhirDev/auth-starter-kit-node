import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Logout from "@/modules/auth/components/Logout";
import { UserIcon } from "lucide-react";
import React from 'react';
import { Link } from "react-router-dom";
import { useAuth } from "@/modules/auth/context/AuthContext";

const getInitials = (name, lastName) => {
  const firstInitial = name ? name.charAt(0).toUpperCase() : "";
  const lastInitial = lastName ? lastName.charAt(0).toUpperCase() : "";
  return firstInitial + lastInitial;
};

const UserMenu = () => {

    const { user } = useAuth();

    const initials = getInitials(user?.name, user?.last_name);

    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user?.avatar} alt={user?.name} />
                            <AvatarFallback>{ initials }</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-48 sm:w-56 ">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none">{user?.name} {user?.last_name}</p>
                            </div>
                        </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link to="/user" className="flex items-center">
                                <UserIcon className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <Logout className="w-full cursor-pointer" />
                    </DropdownMenuItem>

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default UserMenu;
