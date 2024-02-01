import { MenuIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Logo } from "./_components/logo";

export function Header() {
  return (
    <Card className="rounded-none ">
      <CardContent className="flex items-center justify-between px-5 py-6">
        <Logo />
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
