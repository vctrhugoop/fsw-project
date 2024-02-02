import { SectionTitle } from "@/app/_components/section-title";
import { db } from "@/app/_lib/prisma";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
      <div className="space-y-3 px-6 py-5">
        <SectionTitle title="Serviços" />
        {barbershop.services.map((service) => (
          <ServiceItem
            key={service.id}
            service={service}
            isAuthenticated={!!session?.user}
          />
        ))}
      </div>
    </div>
  );
}
