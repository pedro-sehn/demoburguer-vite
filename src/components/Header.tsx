import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import type { EstablishmentData } from "../types/establishmente";

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
    // No futuro dava pra tentar inplementar com um sistema de monitoramento de erros
  }, [error]);

  return (
    <header className="p-6">
      {establishmentData ? (
        <>
          <div className="flex items-center space-x-8">
            <div className="flex rounded-full border-5 border-gray-700">
              <img
                className="w-20 rounded-full border-4 border-red-400"
                src={establishmentData.data.logo}
                alt={`${establishmentData.data.name} logo`}
              />
            </div>
            <h1 className="text-2xl">{establishmentData.data.name}</h1>
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <div>
            <div className="flex gap-8 items-center">
              <Skeleton
                variant="circular"
                width={80}
                height={80}
              />
              <Skeleton variant="text" width={120} height={32} />
            </div>
            <div className="flex space-x-4 py-6">
              <Skeleton variant="text" width={80} height={32} />
              <Skeleton variant="text" width={80} height={32} />
              <Skeleton variant="text" width={80} height={32} />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
