import Header from "@/shared/components/header";
import SidebarDashboard from "@/shared/components/sidebar-dashboard";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative flex">
      <SidebarDashboard />
      <div className="ml-20 min-h-screen w-full bg-gray-50 p-8">
        <Header />
        {children}
      </div>
    </main>
  );
}
