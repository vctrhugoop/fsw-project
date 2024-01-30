"use client";

import { Button } from "@/app/_components/ui/button";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";

export function Search() {
  return (
    <div className="flex gap-2 px-5">
      <Input placeholder="Buscar" />
      <Button variant="default" className="p-3">
        <SearchIcon size={20} />
      </Button>
    </div>
  );
}
