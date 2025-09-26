import { TrendingUp } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/shared/components/ui/card";

export function StatusCard() {
  const items = [
    {
      title: "Menunggu Review",
      value: "150,000",
      desc: "Kontrak direview",
    },
    {
      title: "Menunggu Approval",
      value: "150,000",
      desc: "Kontrak disetujui",
    },
    {
      title: "Expired Soon",
      value: "150,000",
      desc: "Kontrak disetujui",
    },
  ];

  return (
    <Card className="w-3/5">
      <CardContent className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div className="space-y-2" key={item.title}>
            <p className="font-body-2-medium">{item.title}</p>
            <p className="font-heading-2-medium">{item.value}</p>
            <span className="flex items-center gap-2">
              <div className="flex items-center justify-center gap-1 text-green-600">
                <TrendingUp className="h-4 w-4" />
                <span className="text-sm">6%</span>
              </div>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="px-3">
        <footer className="flex flex-col items-start gap-1 border-l-3 border-l-primary pl-3">
          <p className="font-body-1-semibold">Insight</p>
          <ul className="list-disc pl-5 font-body-4-medium text-muted-foreground">
            <li>
              Buat reminder untuk legal bahwa beberapa kontrak segera jatuh
              tempo
            </li>
          </ul>
          <Link
            className="mt-1 font-medium text-primary text-sm hover:underline"
            href="#"
          >
            Selengkapnya →
          </Link>
        </footer>
      </CardFooter>
    </Card>
  );
}
