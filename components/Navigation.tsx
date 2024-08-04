"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMedia } from "react-use";
import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { routes } from "@/constants";
import NavButton from "./NavButton";
import { Button } from "./ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useMedia("(max-width: 1024px)", false);

  const handleClose = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button className="shad-btn-menu" variant="outline" size="sm">
            <Menu className="size-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className="px-2" side="left">
          <SheetHeader>
            <SheetTitle>Finance</SheetTitle>
            <SheetDescription>Where do you want to go?</SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-y-2 pt-6">
            {routes.map((route) => (
              <Button
                key={route.href}
                className="full-width justify-start"
                variant={route.href === pathname ? "secondary" : "ghost"}
                onClick={() => handleClose(route.href)}
              >
                {route.label}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    );
  }
  return (
    <nav className="hidden lg:flex items-center gap-x-2 overflow-x-auto">
      {routes.map((route) => (
        <NavButton
          key={route.href}
          href={route.href}
          label={route.label}
          isActive={pathname === route.href}
        />
      ))}
    </nav>
  );
};

export default Navigation;
