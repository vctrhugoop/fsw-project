import { SectionTitle } from "./section-title";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Card, CardContent } from "./ui/card";

export function BookingCard() {
  return (
    <div className="space-y-3 px-5 py-6">
      <SectionTitle title="agendamento" />
      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-3 p-3">
            <Badge className="w-fit bg-[#221C3D] text-primary hover:bg-[#221C3D]">
              Confirmado
            </Badge>
            <div className="space-y-2">
              <strong>Corte de Cabelo</strong>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage />
                  <AvatarFallback>V</AvatarFallback>
                </Avatar>
                <span className="text-sm">Vintage Barber</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center border-l p-6 text-xs">
            <span>Fevereiro</span>
            <span className="text-2xl">06</span>
            <span>09:45</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
