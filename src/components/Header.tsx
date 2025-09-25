import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import type { EstablishmentData } from "../types/establishment";

export function Header() {
  const [establishmentData, setEstablishmentData] =
    useState<EstablishmentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getEstablishmentData() {
      try {
        const res = await fetch(
          "https://demoburger.stbl.com.br/core/v2/app/store/config/?format=json&app_variant=mobile"
        );
        const data: EstablishmentData = await res.json();

        if (!data.success) throw new Error("Could not fetch company data");

        setEstablishmentData(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      }
    }

    getEstablishmentData();
  }, []);

  useEffect(() => {
    if (error) console.error(error);
  }, [error]);

  if (!establishmentData) {
    return (
      <header className="p-6 flex flex-col items-center text-center">
        <Skeleton variant="circular" width={80} height={80} />
        <Skeleton variant="text" width={120} height={32} className="mt-3" />
        <Skeleton variant="text" width={80} height={24} className="mt-2" />
      </header>
    );
  }

  const {
    logo,
    name,
    background_image,
    background_color,
    primary_color,
    is_open,
  } = establishmentData.data;

  return (
    <header
      className="relative w-full text-white flex flex-col items-center text-center p-6"
      style={{
        background: background_image
          ? `url(${background_image}) center/cover no-repeat`
          : primary_color,
      }}
    >
      <div
        className="absolute inset-0"
        style={{ backgroundColor: background_color }}
      ></div>

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
