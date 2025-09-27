/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
"use client";
import { ChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import ChatBot from "@/features/dashboard/components/chat-bot";
import { Button } from "@/shared/components/ui/button";
import { useContractQueryById } from "@/shared/repository/contract/query";

// fungsi konversi sederhana RTF -> HTML
function rtfToHtml(rtf: string) {
  return rtf
    .replace(/\\b (.*?)\\b0/g, "<strong>$1</strong>") // bold
    .replace(/\\i (.*?)\\i0/g, "<em>$1</em>") // italic
    .replace(/\\ul (.*?)\\ul0/g, "<u>$1</u>") // underline
    .replace(/\\par[d]?/g, "<br/>") // paragraf
    .replace(/\\[a-z]+\d* ?/g, "") // hapus control word lain
    .replace(/[{}]/g, "") // hapus { }
    .trim();
}

const ReviewPage = () => {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const { data: contract, isLoading } = useContractQueryById(id);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!contract?.success) {
    return (
      <main>
        <h1>Review Not Found</h1>
        <p>ID parameter is missing.</p>
      </main>
    );
  }

  // Parsing risk_detection JSON
  let findings: any[] = [];
  try {
    const parsed = JSON.parse(contract.data.risk_detection);
    findings = parsed.findings || [];
  } catch (e) {
    console.error("Gagal parse risk_detection", e);
  }

  // konversi RTF dokumen ke HTML
  const rtfContent = contract.data.documents?.[2]?.content || "";
  const htmlContent = rtfToHtml(rtfContent);

  return (
    <main className="w-full space-y-8">
      {/* Header */}
      <span className="flex w-full items-center justify-between">
        <div className="flex items-center gap-8">
          <ChevronLeft
            className="inline size-8 cursor-pointer"
            onClick={() => {
              router.back();
            }}
          />
          <div className="space-y-1">
            <h1 className="font-heading-2-medium">Review Dokumen</h1>
            <p className="font-body-2-medium">
              Review Dokumen Legal dengan integrasi AI
            </p>
          </div>
        </div>
        <Button>Kirimkan</Button>
      </span>

      {/* Hasil temuan + dokumen */}
      <section className="grid h-full w-full grid-cols-5 gap-6">
        <aside className="col-span-1 space-y-4">
          {findings.map((f, idx) => (
            <div
              className="col-span-1 space-y-4 rounded-2xl border bg-[#F0F8FF] p-4 shadow-sm"
              key={idx.toString()}
            >
              <h3 className="font-heading-3-medium">
                {f.risk_type}{" "}
                <span className="text-gray-500 text-sm">({f.severity})</span>
              </h3>

              <div
                className="prose text-sm"
                dangerouslySetInnerHTML={{ __html: f.clause_text }}
              />

              <div
                className="prose text-blue-900 text-sm"
                dangerouslySetInnerHTML={{ __html: f.rationale }}
              />
            </div>
          ))}
        </aside>

        {/* Dokumen hasil konversi */}
        <div className="col-span-2 h-full overflow-auto rounded-lg border p-4">
          <div
            className="prose text-sm"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </div>

        {/* Chatbot */}
        <div className="col-span-2 h-full">
          <ChatBot id={id} />
        </div>
      </section>
    </main>
  );
};

export default ReviewPage;
