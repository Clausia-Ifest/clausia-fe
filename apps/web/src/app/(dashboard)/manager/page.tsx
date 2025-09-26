"use client";
import UploadCard from "@/features/dashboard/components/upload-card";
import ManagerTable from "@/features/manager/components/manager-table";

const Page = () => (
  <main className="h-max w-full">
    <div className="grid gap-4">
      <div className="space-y-2">
        <h1 className="font-heading-2-medium">Dashboard Management</h1>
        <p className="font-body-semibold text-muted-foreground">
          Lihat Dashboard dan temukan insight untuk operasional kontrakmu !
        </p>
      </div>
      <UploadCard bearer={false} />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border-2 bg-background p-6 shadow-md">
          <h2 className="mb-2 font-body-1-medium">Total Kontrak</h2>
          <p className="mb-4 font-heading-1-medium">150,000</p>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span className="flex items-center text-green-600">
              <svg
                aria-hidden="true"
                className="mr-1"
                fill="none"
                focusable="false"
                height="16"
                viewBox="0 0 16 16"
                width="16"
              >
                <title>Kenaikan</title>
                <path
                  d="M8 3v10M8 3l-4 4M8 3l4 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              6%
            </span>
            <span>Kontrak disetujui</span>
          </div>
        </div>
        <div className="rounded-lg border-2 bg-background p-6 shadow-md">
          <h2 className="mb-2 font-body-1-medium">Kontrak Aktif</h2>
          <p className="mb-4 font-heading-1-medium">150,000</p>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span className="flex items-center text-green-600">
              <svg
                aria-hidden="true"
                className="mr-1"
                fill="none"
                focusable="false"
                height="16"
                viewBox="0 0 16 16"
                width="16"
              >
                <title>Kenaikan</title>
                <path
                  d="M8 3v10M8 3l-4 4M8 3l4 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              6%
            </span>
            <span>Kontrak disetujui</span>
          </div>
        </div>
        <div className="rounded-lg border-2 bg-background p-6 shadow-md">
          <h2 className="mb-2 font-body-1-medium">Kontrak Ditolak</h2>
          <p className="mb-4 font-heading-1-medium">150,000</p>
          <div className="flex items-center space-x-2 text-muted-foreground">
            <span className="flex items-center text-green-600">
              <svg
                aria-hidden="true"
                className="mr-1"
                fill="none"
                focusable="false"
                height="16"
                viewBox="0 0 16 16"
                width="16"
              >
                <title>Kenaikan</title>
                <path
                  d="M8 3v10M8 3l-4 4M8 3l4 4"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
              6%
            </span>
            <span>Kontrak disetujui</span>
          </div>
        </div>
      </div>
      <ManagerTable />
    </div>
  </main>
);

export default Page;
