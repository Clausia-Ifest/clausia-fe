"use client";

import { Plus } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shared/components/ui/tabs";

export default function TaskCard() {
  const reviews = [
    {
      company: "PT Citra Kara",
      status: "Menunggu Review",
      image: "/avatars/team1.jpg",
    },
    {
      company: "PT Citra Kara",
      status: "Menunggu Review",
      image: "/avatars/team2.jpg",
    },
    {
      company: "PT Citra Kara",
      status: "Menunggu Review",
      image: "/avatars/team3.jpg",
    },
  ];
  const expired = [
    {
      company: "PT Citra Kara",
      status: "Jatuh Tempo",
      image: "/avatars/team1.jpg",
    },
    {
      company: "PT Citra Kara",
      status: "Jatuh Tempo",
      image: "/avatars/team2.jpg",
    },
    {
      company: "PT Citra Kara",
      status: "Jatuh Tempo",
      image: "/avatars/team3.jpg",
    },
  ];

  return (
    <Card className="rounded-2xl shadow-md">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="font-semibold text-lg">Jadwal Hari Ini</CardTitle>
        <Button
          className="rounded-full bg-primary text-white hover:bg-primary/90"
          size="icon"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs className="w-full" defaultValue="meetings">
          <TabsList className="grid w-full grid-cols-2 rounded-lg bg-gray-100 p-1">
            <TabsTrigger
              className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              value="meetings"
            >
              Meetings
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm"
              value="jatuh-tempo"
            >
              Jatuh Tempo
            </TabsTrigger>
          </TabsList>

          {/* Meetings */}
          <TabsContent className="mt-4 space-y-4" value="meetings">
            {reviews.map((review, i) => (
              <div
                className="flex items-start justify-between rounded-lg border-primary border-l-4 bg-white p-3 shadow-sm"
                key={i.toString()}
              >
                <div>
                  <h3 className="font-medium">{review.company}</h3>
                  <p className="rounded-full font-body-3-medium text-warning-600">
                    • {review.status}
                  </p>
                  <p className="mt-1 inline-block font-medium text-primary text-sm hover:underline">
                    Ingatkan Lagi →
                  </p>
                </div>
                <Avatar>
                  <AvatarImage alt={review.company} src={review.image} />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </TabsContent>

          {/* Jatuh Tempo */}
          <TabsContent className="mt-4 space-y-2" value="jatuh-tempo">
            {expired.map((items, i) => (
              <div
                className="flex items-start justify-between rounded-lg border-primary border-l-4 bg-white p-3 shadow-sm"
                key={i.toString()}
              >
                <div>
                  <h3 className="font-medium">{items.company}</h3>
                  <p className="rounded-full font-body-3-medium text-danger-600">
                    • {items.status}
                  </p>
                  <p className="mt-1 inline-block font-medium text-primary text-sm hover:underline">
                    Ingatkan Lagi →
                  </p>
                </div>
                <Avatar>
                  <AvatarImage alt={items.company} src={items.image} />
                  <AvatarFallback>TM</AvatarFallback>
                </Avatar>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
