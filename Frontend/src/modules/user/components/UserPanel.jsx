import { Lock, Radio, Smartphone, User } from "lucide-react";
import UserUpdate from "./UserUpdate";
import UserSecurity from "./UserSecurity";
import UpdatePassword from "./passwords/UpdatePassword";
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Notification from "@/components/Notification";

const tabs = [
  {
    id: "tab1",
    label: "User",
    icon: User,
    component: UserUpdate,
  },
  {
    id: "tab2",
    label: "2FA Authentication",
    icon: Smartphone,
    component: UserSecurity,
  },
  {
    id: "tab3",
    label: "Change Password",
    icon: Lock,
    component: UpdatePassword,
  },
  {
    id: "tab4",
    label: "Websocket",
    icon: Radio,
    component: Notification,
  },
];

const UserPanel = () => {
  const [activeTab, setActiveTab] = useState("tab1");

  const activeTabObj = tabs.find((tab) => tab.id === activeTab);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45%_40%_at_50%_60%,hsl(var(--primary)/8%)_0,transparent_100%)]" />
      <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <Badge variant="secondary" className="mb-3 px-4 py-2 inline-flex items-center justify-center">
            <User className="w-4 h-4 mr-2 text-primary" />
            Account Settings
          </Badge>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
            User{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Panel
            </span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl sm:max-w-2xl mx-auto px-2">
            Manage your personal information, security, and account preferences all in one place.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:grid lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1 mb-6 lg:mb-0">
              <Card className="sticky top-4 bg-background/80 backdrop-blur-md border border-border shadow-sm">
                <CardContent className="p-4 sm:p-6">
                  <nav className="flex justify-center lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2">
                    {tabs.map(({ id, label, icon: Icon }) => (
                      <Button
                        key={id}
                        variant={activeTab === id ? "default" : "ghost"}
                        onClick={() => setActiveTab(id)}
                        className={`flex-1 sm:flex-none justify-center lg:justify-start gap-2 rounded-full transition duration-200 ${
                          activeTab === id
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="hidden sm:inline">{label}</span>
                      </Button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-3">
              <Card className="bg-background/80 backdrop-blur-md border border-border shadow-sm">
                <CardContent className="p-6 sm:p-8">
                  {activeTabObj?.component && React.createElement(activeTabObj.component)}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPanel;