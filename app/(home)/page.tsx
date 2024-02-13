import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from "../_lib/prisma";

import { getServerSession } from "next-auth";
import { BookingCard } from "../_components/booking-card";
import { Header } from "../_components/header/header";
import { Search } from "../_components/search";
import { SectionTitle } from "../_components/section-title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../_components/ui/carousel";
import { ScrollArea, ScrollBar } from "../_components/ui/scroll-area";
import { authOptions } from "../utils/authOpitions";
import { BarbershopItem } from "./_components/barbershop-item";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const barbershops = await db.barbershop.findMany({});

  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
        },
        include: {
          service: true,
          barbershop: true,
        },
      })
    : [];

  return (
    <div className="space-y-6 pb-12">
      <Header />
      <div className="px-5">
        <h2 className="text-xl">
          {session?.user
            ? `Olá, ${session.user.name?.split(" ")[0]}!`
            : "Olá! Vamos agendar um corte hoje?"}
        </h2>
        <span className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </span>
      </div>

      <Search />

      {bookings.length > 0 ? (
        <Carousel className="mx-auto w-full px-5">
          <CarouselContent>
            {bookings.map((booking) => (
              <CarouselItem key={booking.id}>
                <BookingCard booking={booking} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious variant="ghost" />
          <CarouselNext variant="ghost" />
        </Carousel>
      ) : null}

      <div className="space-y-3 px-6">
        <SectionTitle title="recomendados" />
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      <div className="space-y-3 px-6">
        <SectionTitle title="popular" />
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex gap-4 pb-4">
            {barbershops.map((barbershop) => (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
