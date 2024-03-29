"use server";
import { db } from "@/app/_lib/prisma";
import { endOfDay, startOfDay } from "date-fns";

export async function GetDayBookings(barbershopId: string, date: Date) {
  const bookings = await db.booking.findMany({
    where: {
      barbershopId,
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
  return bookings;
}
