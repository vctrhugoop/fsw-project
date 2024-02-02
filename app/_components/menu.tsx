"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import {
  CalendarDays,
  HomeIcon,
  LogInIcon,
  LogOutIcon,
  User2Icon,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SheetHeader, SheetTitle } from "./ui/sheet";

export function Menu() {
  const { data } = useSession();

  function handleLogin() {
    signIn("google");
  }

  function haddleLogout() {
    signOut();
  }
  return (
    <>
      <SheetHeader className="border-b px-5 py-6">
        <SheetTitle>Menu</SheetTitle>
      </SheetHeader>

      {data?.user ? (
        <div className="space-y-6 px-5 py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage
                  src={data.user?.image ?? ""}
                  className="h-10 w-10 rounded-full"
                />
              </Avatar>
              <h2 className="font-bold">{data.user.name}</h2>
            </div>
            <Button size="icon" variant="secondary" onClick={haddleLogout}>
              <LogOutIcon size={20} />
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-3 px-5 py-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border-2 border-gray-500 text-gray-500">
                <User2Icon size={40} strokeWidth={1.5} />
              </div>
              <h2 className="font-bold">Olá. Faça seu login!</h2>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <Button
              variant="outline"
              className="flex items-center justify-start gap-2"
              onClick={handleLogin}
            >
              <LogInIcon size={16} />
              Fazer Login
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 px-5 ">
        <Button variant="outline" className="justify-start gap-2" asChild>
          <Link href="/">
            <HomeIcon size={16} />
            Inícios
          </Link>
        </Button>

        {data?.user && (
          <Button variant="outline" className="justify-start gap-2" asChild>
            <Link href="/booking">
              <CalendarDays size={16} />
              Agendamentos
            </Link>
          </Button>
        )}
      </div>
    </>
  );
}
