import { SectionTitle } from "@/app/_components/section-title";
import { Button } from "@/app/_components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/app/_components/ui/tabs";
import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/utils/authOpitions";
import { Smartphone } from "lucide-react";
import { getServerSession } from "next-auth";
import { BarberShopInfo } from "./_components/barbershop-info";
import { ServiceItem } from "./_components/service-item";

interface BarberShopDetailsProps {
  params: {
    id?: string;
  };
}

export default async function BarberShopDetails({
  params,
}: BarberShopDetailsProps) {
  const session = await getServerSession(authOptions);

  if (!params.id) {
    // TODO: redirecionar para home page.
    return null;
  }

  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  });

  if (!barbershop) {
    return null;
  }

  return (
    <div>
      <BarberShopInfo barbershop={barbershop} />
      <div className="space-y-3 py-5">
        <Tabs defaultValue="services">
          <TabsList className="space-x-2 px-6">
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="information">Informações</TabsTrigger>
          </TabsList>
          <TabsContent value="services" className="space-y-3 px-6 py-5">
            {barbershop.services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                barbershop={barbershop}
                isAuthenticated={!!session?.user}
              />
            ))}
          </TabsContent>
          <TabsContent value="information" className="space-y-3 py-5">
            <div className="space-y-3 border-b px-6 pb-6">
              <SectionTitle title="sobre nós" />
              <p className="text-sm text-gray-200">
                {`Bem-vindo à ${barbershop.name}, onde tradição encontra estilo. Nossa equipe de mestres barbeiros transforma cortes de cabelo e barbas em obras de arte. Em um ambiente acolhedor, promovemos confiança, estilo e uma comunidade unida.`}
              </p>
            </div>
            <div className="flex items-center justify-between border-b px-6 pb-6 pt-3 text-sm">
              <div className="flex items-center">
                <Smartphone />
                {`(11) 9 9999-9999`}
              </div>
              <div>
                <Button variant="secondary">Copiar</Button>
              </div>
            </div>
            <div className="space-y-3 px-6 py-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Segunda-feira</span>
                <span>Fechado</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Terça-feira</span>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Quarta-feira</span>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Quinta-feira</span>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sexta-feira</span>
                <span>09:00 - 21:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Sábado</span>
                <span>09:00 - 17:00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Domingo</span>
                <span>Fechado</span>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
