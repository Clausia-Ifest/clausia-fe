/** biome-ignore-all lint/style/useNamingConvention: <explanation> */
"use server";

import { apiFetch } from "@/shared/lib/api/fetcher";
import { env } from "@/shared/lib/env";
import { getSession } from "../session-manager/action";
import type { Contract, ContractsResponse } from "./dto";

export async function getContracts() {
  const res = await apiFetch<ContractsResponse>({
    url: `${env.API_URL}/contracts`,
    options: {
      method: "GET",
    },
  });

  return res;
}
export async function getContractsById(id: string) {
  const res = await apiFetch<Contract>({
    url: `${env.API_URL}/contracts/${id}`,
    options: {
      method: "GET",
    },
  });

  return res;
}

import type { BotAnswer } from "@/shared/utils/bot-template";

export async function getChatBotResponse(
  question: string,
  id: string
): Promise<{ answer: BotAnswer | string }> {
  // simulasi delay biar realistis
  await new Promise((res) => setTimeout(res, 5000));

  // Kondisi khusus: kalau user bilang "terima kasih" atau "mengerti"
  if (/terima kasih|mengerti/i.test(question)) {
    return {
      answer:
        "🙏 Sama-sama! Senang bisa membantu. Jika ada pertanyaan lain seputar kontrak atau hukum, silakan tanyakan kembali ya.",
    };
  }

  // Default jawaban template hukum
  const mockAnswer: BotAnswer = {
    definisi:
      "Risiko yang dimaksud adalah potensi kerugian ekonomi, sosial, maupun lingkungan akibat penggunaan lahan yang tidak sesuai dengan rencana tata ruang.",
    hukum:
      "UU No. 26 Tahun 2007 tentang Penataan Ruang, khususnya Pasal 37–38 mengenai kewajiban pemanfaatan ruang.",
    analisis:
      "Jika penggunaan lahan menyimpang, dapat menimbulkan konflik kepemilikan, penurunan nilai aset, hingga sanksi administratif atau pidana.",
    kesimpulan:
      "Sebaiknya dilakukan audit kesesuaian lahan dengan tata ruang serta mitigasi hukum agar tidak menimbulkan sengketa di masa depan.",
  };

  return { answer: mockAnswer };
}

export async function submitContracts(data: FormData) {
  const session = await getSession();
  const res = await fetch(`${env.API_URL}/contracts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${session.access_token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(`Failed to submit contracts: ${res.statusText}`);
  }

  const result = await res.json();
  return result;
}

export async function sendContract(contractId: string) {
  const res = await apiFetch<{ message: string }>({
    url: `${env.API_URL}/contracts/${contractId}`,
    options: {
      method: "PATCH",
      body: JSON.stringify({
        application_status: "Manager",
      }),
    },
  });

  return res;
}
