import {
  ChatContainer,
  ConversationHeader,
  MessageList,
  Message,
  MessageInput,
  MainContainer,
} from "@chatscope/chat-ui-kit-react";

import { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", sender: "ai" },
  ]);

  const sendMessage = async (inputText: string) => {
    setMessages((prev) => [...prev, { text: inputText, sender: "user" }]);

    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: inputText }), // Match backend's expected input
      });

      if (!res.ok) {
        throw new Error("Failed to fetch response from backend");
      }

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.response, sender: "ai" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, something went wrong.", sender: "ai" },
      ]);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: "100vh",
      }}
    >
      <MainContainer>
        <ChatContainer>
          <ConversationHeader>
            <ConversationHeader.Content userName="AI Assistant" info="Online" />
          </ConversationHeader>
          <MessageList>
            {messages.map((msg, i) => (
              <Message
                key={i}
                model={{
                  message: msg.text,
                  sentTime: "just now",
                  sender: msg.sender === "user" ? "User" : "AI Assistant",
                  direction: msg.sender === "user" ? "outgoing" : "incoming",
                  position: "normal",
                }}
              />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={(val) => sendMessage(val)}
            attachButton={false}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
