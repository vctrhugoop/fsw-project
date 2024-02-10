import { isFuture, isPast } from "date-fns";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { BookingCard } from "../_components/booking-card";
import { Header } from "../_components/header/header";
import { SectionTitle } from "../_components/section-title";
import { db } from "../_lib/prisma";
import { authOptions } from "../utils/authOpitions";

export default async function Bookings() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
    },
    include: {
      service: true,
      barbershop: true,
    },
  });

  const confirmedBoookings = bookings.filter((booking) =>
    isFuture(booking.date),
  );
  const finishedBoookings = bookings.filter((booking) => isPast(booking.date));

  return (
    <div className="space-y-6 pb-12">
      <Header />
      <h1 className="px-5 text-xl font-bold">Agendamento</h1>
      <div className="space-y-3 px-5">
        <SectionTitle title="confirmadas" />
        {confirmedBoookings.length > 0 ? (
          confirmedBoookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p className="text-center text-sm text-gray-400">
            Nenhum agendamento confirmado!
          </p>
        )}
      </div>
      <div className="space-y-3 px-5">
        <SectionTitle title="finalizados" />
        {finishedBoookings.length > 0 ? (
          finishedBoookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))
        ) : (
          <p className="text-center text-sm text-gray-400">
            Nenhum agendamento finalizado!
          </p>
        )}
      </div>
    </div>
  );
}
