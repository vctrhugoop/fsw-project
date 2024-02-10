import { Prisma } from "@prisma/client";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

interface BookingCardProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: true;
      barbershop: true;
    };
  }>;
}

export function BookingCard({ booking }: BookingCardProps) {
  const isBookingConfirmed = isFuture(booking.date);

  return (
    <Card className="flex-1">
      <CardContent className="flex justify-between p-0">
        <div className="flex flex-col gap-3 p-3">
          <Badge
            className="w-fit"
            variant={isBookingConfirmed ? "default" : "secondary"}
          >
            {isBookingConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>
          <div className="space-y-2">
            <strong>{booking.service.name}</strong>
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={booking.barbershop.imageUrl} />
                <AvatarFallback>
                  {booking.barbershop.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm">{booking.barbershop.name}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center border-l p-6 text-xs capitalize">
          <span>
            {format(booking.date, "MMMM", {
              locale: ptBR,
            })}
          </span>
          <span className="text-2xl">
            {format(booking.date, "dd", {
              locale: ptBR,
            })}
          </span>
          <span>
            {format(booking.date, "hh:mm", {
              locale: ptBR,
            })}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
