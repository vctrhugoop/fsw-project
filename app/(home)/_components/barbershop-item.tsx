"use client";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Barbershop } from "@prisma/client";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BarbershopItemProps {
  barbershop: Barbershop;
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
  const router = useRouter();

  function handleBookingPage() {
    router.push(`/barbershops/${barbershop.id}`);
  }

  return (
    <div>
      <Card className="min-w-40 max-w-40 rounded-2xl">
        <CardContent>
          <div className="relative px-1 pb-2 pt-1">
            <Image
              src={barbershop.imageUrl}
              height={0}
              width={0}
              sizes="100vw"
              alt={barbershop.name}
              className="h-[159px] w-full rounded-xl object-cover"
            />
            <div className="absolute left-3 top-3 z-50 ">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 bg-[#221C3DB2] bg-opacity-70 hover:bg-[#221C3DB2] "
              >
                <StarIcon size={12} className="fill-primary text-primary" />
                <span>5,0</span>
              </Badge>
            </div>
          </div>
          <div className="space-y-3 px-3 pb-3">
            <div>
              <h2 className="truncate font-bold">{barbershop.name}</h2>
              <p className="truncate text-sm text-gray-400">
                {barbershop.address}
              </p>
            </div>
            <Button
              variant="secondary"
              className="w-full"
              onClick={handleBookingPage}
            >
              Reservar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
