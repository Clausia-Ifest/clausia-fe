import { ContractModal } from "@/shared/components/contract-modal";
import Header from "@/shared/components/header";
import { ModalLoading } from "@/shared/components/loading-modal";
import SidebarDashboard from "@/shared/components/sidebar-dashboard";
import { SuccessModal } from "@/shared/components/success-modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid h-screen w-full place-items-center text-center md:hidden">
        <h1 className="max-w-md px-4 font-semibold text-primary md:hidden">
          Harap Menggunakan Perangkat Dengan Layar Yang Lebih Besar Untuk
          Mengakses Dashboard
        </h1>
      </div>
      <main className="relative hidden md:flex">
        <SidebarDashboard />
        <div className="min-h-screen w-full p-8">
          <Header />
          <ModalLoading />
          <ContractModal />
          <SuccessModal />
          {children}
        </div>
      </main>
    </>
  );
}
