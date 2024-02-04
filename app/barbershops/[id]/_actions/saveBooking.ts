"use server";

import { db } from "@/app/_lib/prisma";

interface ServerBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: string;
}

export async function SaveBooking(params: ServerBookingParams) {
  await db.booking.create({
    data: {
      barbershopId: params.barbershopId,
      serviceId: params.serviceId,
      userId: params.userId,
      date: params.date,
    },
  });
}
