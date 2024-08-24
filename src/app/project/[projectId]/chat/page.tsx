import { chatRepository } from "@/database/repositories/chat-repository";
import { ChatPanel } from "./_components/chat-panel";

export default async function ChatPage() {
  const chatHistory = await chatRepository.getAll();
  return <ChatPanel chatHistory={chatHistory} />;
}
