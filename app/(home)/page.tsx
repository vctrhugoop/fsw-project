import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Key } from "react";
import { db } from "../_lib/prisma";

import { BookingCard } from "../_components/booking-card";
import { Header } from "../_components/header/header";
import { Search } from "../_components/search";
import { SectionTitle } from "../_components/section-title";
import { RecommendedCard } from "./_components/recommended-card";

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
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: { id: Key | null | undefined }) => (
            <RecommendedCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <div className="space-y-3 px-6 pb-12 pt-6">
        <SectionTitle title="popular" />
        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop: { id: Key | null | undefined }) => (
            <RecommendedCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
