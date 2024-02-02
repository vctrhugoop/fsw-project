"use client";

import { MenuIcon } from "lucide-react";
import { Menu } from "../menu";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Logo } from "./_components/logo";

export function Header() {
  return (
    <Card className="rounded-none ">
      <CardContent className="flex items-center justify-between px-5 py-6">
        <Logo />
        <Sheet>
          <SheetTrigger>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <Menu />
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
}
