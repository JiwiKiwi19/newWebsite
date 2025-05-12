import { useState } from "react";

type Message = {
  user: string;
  text: string;
}[];

export default function Chat() {
  const [messages, setMessages] = useState<Message>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ message: input }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    setMessages([
      ...messages,
      { user: "Jiwon", text: input },
      { user: "AI", text: data.reply },
    ]);
    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
