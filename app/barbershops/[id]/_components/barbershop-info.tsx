"use client";

import { Menu } from "@/app/_components/menu";
import { Button } from "@/app/_components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/app/_components/ui/sheet";
import { Barbershop } from "@prisma/client";
import { ChevronLeftIcon, MapPin, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopInfoProps {
  barbershop: Barbershop;
}

export function BarberShopInfo({ barbershop }: BarbershopInfoProps) {
  const router = useRouter();

  function handleBackPage() {
    router.replace("/");
  }

  return (
    <>
      <div className="relative h-52 w-full object-cover">
        <Button
          size="icon"
          variant="outline"
          className="absolute left-5 top-6 z-50"
          onClick={handleBackPage}
        >
          <ChevronLeftIcon />
        </Button>
        <Sheet>
          <SheetTrigger>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-5 top-6 z-50"
            >
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="p-0">
            <Menu />
          </SheetContent>
        </Sheet>

        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="opacity-75"
        />
      </div>
      <div className="border-b border-secondary px-5 pb-6 pt-3">
        <h1 className="text-xl font-bold">{barbershop.name}</h1>
        <div className="mt-3 flex items-center gap-2">
          <MapPin className="text-primary" size={16} />
          <p className="text-sm">{barbershop.address}</p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <StarIcon className="text-primary" size={16} />
          <p className="text-sm">{`5,0 (889 avaliações)`}</p>
        </div>
      </div>
    </>
  );
}
