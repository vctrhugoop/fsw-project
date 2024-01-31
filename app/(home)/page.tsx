import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from "../_lib/prisma";

import { Key } from "react";
import { BookingCard } from "../_components/booking-card";
import { Header } from "../_components/header";
import { SectionTitle } from "../_components/section-title";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../_components/ui/carousel";
import { RecommendedCard } from "./_components/recommended-card";
import { Search } from "./_components/search";

export default async function Home() {
  const barbershops = await db.barbershop.findMany({});

  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-xl">
          Olá, <strong>Victor</strong>
        </h2>
        <span className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </span>
      </div>

      <Search />
      <BookingCard />

      <div className="space-y-3 px-6">
        <SectionTitle title="recomendados" />
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="flex gap-4">
                {barbershops.map(
                  (barbershop: { id: Key | null | undefined }) => (
                    <RecommendedCard
                      key={barbershop.id}
                      barbershop={barbershop}
                    />
                  ),
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      <div className="space-y-3 px-6 pb-12 pt-6">
        <SectionTitle title="popular" />
        <Carousel
          opts={{
            align: "start",
          }}
          className="mx-auto w-full"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="flex gap-4">
                {barbershops.map(
                  (barbershop: { id: Key | null | undefined }) => (
                    <RecommendedCard
                      key={barbershop.id}
                      barbershop={barbershop}
                    />
                  ),
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
}
