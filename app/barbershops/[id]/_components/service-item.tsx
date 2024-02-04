"use client";

import { Button } from "@/app/_components/ui/button";
import { Calendar } from "@/app/_components/ui/calendar";
import { Card, CardContent } from "@/app/_components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import { Barbershop, Service } from "@prisma/client";
import { format, setHours, setMinutes } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Loader2 } from "lucide-react";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import router from "next/router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SaveBooking } from "../_actions/saveBooking";
import { generateDayTimeList } from "../_helpers/hours";

interface ServiceItemProps {
  barbershop: Barbershop;
  service: Service;
  isAuthenticated: boolean;
}

export function ServiceItem({
  service,
  isAuthenticated,
  barbershop,
}: ServiceItemProps) {
  const { data } = useSession();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [hour, setHour] = useState<string | undefined>();
  const [submitIsLoading, setSubmitIsLoading] = useState(false);
  const [sheetIsOpen, setSheetIsOpen] = useState(false);

  function handleDate(date: Date | undefined) {
    setDate(date);
    setHour(undefined);
  }

  function handleHour(time: string) {
    setHour(time);
  }

  function handleBooking() {
    if (!isAuthenticated) {
      return signIn("google");
    }
  }

  async function handleBookingSubmit() {
    setSubmitIsLoading(true);
    try {
      if (!hour || !date || !data?.user) {
        return;
      }

      const dateHour = Number(hour.split(":")[0]);

      const dateMinutes = Number(hour.split(":")[1]);

      const newDate = setMinutes(setHours(date, dateHour), dateMinutes);

      await SaveBooking({
        serviceId: service.id,
        barbershopId: barbershop.id,
        userId: (data.user as any).id,
        date: newDate as any,
      });

      setSheetIsOpen(false);
      setHour(undefined);
      setDate(undefined);
      toast("Reserva realizada com sucesso!", {
        description: format(newDate, "'Para' dd 'de' MMMM 'às' HH':'mm'.'", {
          locale: ptBR,
        }),
        action: {
          label: "Visualizar",
          onClick: () => router.push("/bookings"),
        },
      });
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitIsLoading(false);
    }
  }

  const timeList = useMemo(() => {
    return date ? generateDayTimeList(date) : [];
  }, [date]);

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
              <Sheet open={sheetIsOpen} onOpenChange={setSheetIsOpen}>
                <SheetTrigger>
                  <Button variant="secondary" onClick={handleBooking}>
                    Reservar
                  </Button>
                </SheetTrigger>
                <SheetContent className="p-0">
                  <SheetHeader className="px-5 py-6">
                    <SheetTitle className="text-left">Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDate}
                    locale={ptBR}
                    fromDate={new Date()}
                    className="border-b"
                    styles={{
                      head_cell: {
                        width: "100%",
                        textTransform: "capitalize",
                      },
                      cell: {
                        width: "100%",
                      },
                      button: {
                        width: "100%",
                      },
                      nav_button_previous: {
                        width: "32px",
                        height: "32px",
                      },
                      nav_button_next: {
                        width: "32px",
                        height: "32px",
                      },
                      caption: {
                        textTransform: "capitalize",
                      },
                    }}
                  />

                  {date && (
                    <div className="flex gap-3 overflow-x-auto border-y px-6 py-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.map((time) => (
                        <Button
                          key={time}
                          className="rounded-full"
                          variant={hour === time ? "default" : "outline"}
                          onClick={() => handleHour(time)}
                        >
                          {time}
                        </Button>
                      ))}
                    </div>
                  )}

                  <div className="px-6 py-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex justify-between">
                          <strong>{service.name}</strong>
                          <strong className="text-sm">
                            {Intl.NumberFormat("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            }).format(Number(service.price))}
                          </strong>
                        </div>

                        {date && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Data</span>
                            <span className="text-sm">
                              {format(date, "dd 'de' MMMM", {
                                locale: ptBR,
                              })}
                            </span>
                          </div>
                        )}
                        {hour && (
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Horário
                            </span>
                            <span className="text-sm ">{hour}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-500">
                            Barbearia
                          </span>
                          <span className="text-sm">{barbershop.name}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <SheetFooter className="p-6">
                    <Button
                      disabled={!hour || !date || submitIsLoading}
                      onClick={handleBookingSubmit}
                    >
                      {submitIsLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
