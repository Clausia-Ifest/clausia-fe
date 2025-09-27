"use client";

import { motion } from "framer-motion";
import { Bot, List, Send, ShieldQuestion } from "lucide-react";
import { useState } from "react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { getChatBotResponse } from "@/shared/repository/contract/action";

type Message = {
  id: number;
  sender: "bot" | "user";
  text?: string;
  thinking?: boolean;
};

export default function ClauBot({ id }: { id: string }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Selamat pagi, Salsabilah!\n\nLaporan studi ini membahas faktor-faktor ...",
    },
  ]);

  const [input, setInput] = useState("");
  const [showQuickActions, setShowQuickActions] = useState(true);

  const handleSend = async () => {
    if (!input.trim()) return;

    // user message
    const userMsg: Message = {
      id: Date.now(),
      sender: "user",
      text: input,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setShowQuickActions(false);

    // thinking bubble
    const thinkingMsg: Message = {
      id: Date.now() + 1,
      sender: "bot",
      thinking: true,
    };
    setMessages((prev) => [...prev, thinkingMsg]);

    try {
      const res = await getChatBotResponse(userMsg.text!, id);

      setMessages((prev) =>
        prev.map((m) =>
          m.thinking ? { ...m, thinking: false, text: res.answer } : m
        )
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((m) =>
          m.thinking
            ? { ...m, thinking: false, text: "❌ Gagal mendapatkan jawaban." }
            : m
        )
      );
    }
  };

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-xl border">
      {/* Header */}
      <div className="flex items-center gap-3 border-b bg-muted/30 p-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Bot className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-sm">ClauBot</h2>
          <p className="text-muted-foreground text-xs">
            Tanya AI seputar kontrak & hukum untuk jawaban instan & kontekstual.
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="max-h-[600px] flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((msg) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className={`max-w-[85%] whitespace-pre-line rounded-lg px-3 py-2 text-sm ${
              msg.sender === "user"
                ? "ml-auto bg-primary text-white"
                : "bg-muted"
            }`}
            initial={{ opacity: 0, y: 10 }}
            key={msg.id}
          >
            {msg.thinking ? (
              <motion.div
                animate={{ opacity: 1 }}
                className="flex gap-1"
                initial={{ opacity: 0.5 }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 1,
                  repeatType: "reverse",
                }}
              >
                <div className="h-2 w-2 rounded-full bg-gray-400" />
                <div className="h-2 w-2 rounded-full bg-gray-400" />
                <div className="h-2 w-2 rounded-full bg-gray-400" />
              </motion.div>
            ) : (
              msg.text
            )}
          </motion.div>
        ))}

        {/* Quick Actions */}
        {showQuickActions && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
            initial={{ opacity: 0, y: 10 }}
          >
            <p className="text-muted-foreground text-sm">
              Mau saya ringkas keseluruhan laporan ini?
            </p>
            <div className="flex flex-col gap-2">
              <Button className="justify-start text-sm" variant="outline">
                <List className="h-4 w-4 text-primary-600" />
                Ringkas Laporan ini
              </Button>
              <Button className="justify-start text-sm" variant="outline">
                <ShieldQuestion className="h-4 w-4 text-primary-600" />
                Apa ada kesalahan pasal pada dokumen berikut?
              </Button>
              <Button className="justify-start text-sm" variant="outline">
                <ShieldQuestion className="h-4 w-4 text-primary-600" />
                Apa pasal yang sesuai dengan dokumen ini?
              </Button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 border-t p-3">
        <Input
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Tanyakan apa saja..."
          value={input}
        />
        <Button onClick={handleSend} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
