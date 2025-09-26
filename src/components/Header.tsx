import type { EstablishmentData } from "../types/establishment";

export function Header({
  establishmentData,
}: {
  establishmentData: EstablishmentData["data"];
}) {
  if (!establishmentData) {
    return (
      <header className="p-6 flex flex-col items-center text-center">
        Carregando página...
      </header>
    );
  }

  const { logo, name, is_open } = establishmentData;

  return (
    <header className="relative w-full bg-[var(--primary-color)] text-[var(--primary-text-color)] flex flex-col items-center text-center p-6">
      <div className="absolute inset-0 bg-[var(--background-color)]"></div>

      <div className="relative flex flex-col items-center">
        <img
          className="w-20 h-20 rounded-full border-4 border-white shadow-lg"
          src={logo}
          alt={`${name} logo`}
        />

        <h1 className="text-2xl font-bold mt-3">{name}</h1>

        <span
          className={`mt-2 text-sm font-medium px-3 py-1 rounded-full ${
            is_open ? "bg-green-600" : "bg-red-600"
          }`}
        >
          {is_open ? "Aberto agora" : "Fechado"}
        </span>
      </div>
    </header>
  );
}
