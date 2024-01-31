import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from "../_lib/prisma";

import { Key } from "react";
import { BookingCard } from "../_components/bookingCard";
import { Header } from "../_components/header";
import { SectionTitle } from "../_components/sectionTitle";
import { RecomendedCard } from "./_components/RecomendedCard";
import { Search } from "./_components/Search";

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
            <RecomendedCard key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
}
