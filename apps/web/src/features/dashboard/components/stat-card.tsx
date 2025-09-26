import { CheckCircle, TrendingUp, XCircle } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

export function StatsCard() {
  return (
    <Card className="w-2/5">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="font-body-1-medium">Total Kontrak</CardTitle>
        <Link
          className="font-medium text-primary text-sm hover:underline"
          href="#"
        >
          Selengkapnya
        </Link>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-8">
          <h2 className="font-heading-1-semibold">150,000</h2>
          <div className="mt-2 flex flex-col gap-2">
            <span className="flex w-max items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-green-600 text-sm">
              <TrendingUp className="h-4 w-4" />
              12.1%
            </span>
            <p className="text-muted-foreground text-sm">
              Total Kerja sama naik sekitar 12,1% dari bulan sebelumnya
            </p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-2 text-center">
          <div>
            <CheckCircle className="mx-auto mb-1 h-6 w-6 text-green-500" />
            <p className="font-semibold">10,000</p>
            <p className="text-muted-foreground text-sm">Aktif</p>
          </div>
          <div>
            <XCircle className="mx-auto mb-1 h-6 w-6 text-red-500" />
            <p className="font-semibold">10,000</p>
            <p className="text-muted-foreground text-sm">Ditolak</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
