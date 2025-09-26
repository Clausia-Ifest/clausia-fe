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
    <main className="relative flex">
      <SidebarDashboard />
      <div className="min-h-screen w-full p-8">
        <Header />
        <ModalLoading />
        <ContractModal />
        <SuccessModal />
        {children}
      </div>
    </main>
  );
}
