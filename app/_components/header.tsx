import { MenuIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

export function Header() {
  return (
    <Card className="rounded-none ">
      <CardContent className="flex justify-between px-5 py-6">
        <Image src="/logo.svg" alt="Logo" height={22} width={120} />
        <Button variant="outline" size="icon">
          <MenuIcon />
        </Button>
      </CardContent>
    </Card>
  );
}
