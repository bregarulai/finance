import Link from "next/link";

import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const NavButton = ({ href, label, isActive }: NavButtonProps) => {
  return (
    <Button
      asChild
      size="sm"
      variant="outline"
      className={cn(
        "shad-btn-navigation",
        isActive ? "bg-white/10 text-white" : "bg-transparent"
      )}
    >
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default NavButton;
