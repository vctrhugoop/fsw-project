import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { db } from "../_lib/prisma";

import { getServerSession } from "next-auth";
import { Header } from "../_components/header/header";
import { Search } from "../_components/search";
import { SectionTitle } from "../_components/section-title";
import { ScrollArea, ScrollBar } from "../_components/ui/scroll-area";
import { authOptions } from "../utils/authOpitions";
import { BarbershopItem } from "./_components/barbershop-item";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});

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
      {/* <BookingCard /> */}

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
