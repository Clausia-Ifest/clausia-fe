export type BotAnswer = {
  definisi: string;
  hukum: string;
  analisis: string;
  kesimpulan: string;
};

export function formatBotAnswer(question: string, answer: BotAnswer) {
  return `
  **📝 Pertanyaan:**  
  ${question}
  
  ---
  
  **📖 Definisi / Penjelasan Singkat:**  
  ${answer.definisi}
  
  **⚖️ Dasar Hukum / Pasal Relevan:**  
  ${answer.hukum}
  
  **🔍 Analisis & Implikasi:**  
  ${answer.analisis}
  
  **✅ Kesimpulan / Saran:**  
  ${answer.kesimpulan}
    `;
}
