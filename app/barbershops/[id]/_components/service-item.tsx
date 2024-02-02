"use client";

import { Button } from "@/app/_components/ui/button";
import { Card, CardContent } from "@/app/_components/ui/card";
import { Service } from "@prisma/client";
import { signIn } from "next-auth/react";
import Image from "next/image";

interface ServiceItemProps {
  service: Service;
  isAuthenticated: boolean;
}

export function ServiceItem({ service, isAuthenticated }: ServiceItemProps) {
  function handleBooking() {
    if (!isAuthenticated) {
      return signIn("google");
    }
  }

  return (
    <Card className="p-3">
      <CardContent>
        <div className="flex w-full gap-3">
          <div className="relative max-h-28 min-h-28 min-w-28 max-w-28">
            <Image
              src={service.imageUrl}
              alt={service.name}
              style={{ objectFit: "contain" }}
              className="rounded-lg object-cover"
              fill
            />
          </div>
          <div className="flex w-full flex-col justify-between">
            <div>
              <h2 className="text-sm font-bold">{service.name}</h2>
              <p className="text-sm text-gray-400">{service.description}</p>
            </div>
            <div className="flex items-center justify-between ">
              <span className="text-sm font-bold text-primary">
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(service.price))}
              </span>
              <Button variant="secondary" onClick={handleBooking}>
                Reservar
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
