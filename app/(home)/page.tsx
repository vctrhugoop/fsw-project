import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Header } from "../_components/header";
import { Search } from "./_components/Search";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="px-5 py-6">
        <h2 className="text-xl">
          Olá, <strong>Victor</strong>
        </h2>
        <span className="text-sm capitalize">
          {format(new Date(), "EEEE',' dd 'de' MMMM", {
            locale: ptBR,
          })}
        </span>
      </div>

      <Search />
    </div>
  );
}
