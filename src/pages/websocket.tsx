import { useEffect, useRef, useState } from "react";

const WebsocketPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const socketRef = useRef<any>(null);

  useEffect(() => {
    socketRef.current = new WebSocket("example");

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };
    socketRef.current.onmessage = (e: { data: string }) => {
      const receivedMessage = JSON.parse(e.data);

      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg.id === receivedMessage.id) {
            return receivedMessage;
          }
          return msg;
        });
      });
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  const onSendMessage = () => {
    if (socketRef.current && messageInput.trim() !== "") {
      const optimisticMessage = {
        id: Date.now().toString(),
        message: messageInput,
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, optimisticMessage]);
      const messageToSend = {
        // id: optimisticMessage.id,
        message: messageInput,
        // timestamp: optimisticMessage.timestamp,
      };

      socketRef.current.send(JSON.stringify(messageToSend));
      setMessageInput("");
    }
  };

  return (
    <div>
      <h1>Websocket Testing</h1>
      <div>
        <h2>Messages:</h2>
        <ul>
          {messages.map((item, index) => (
            <li key={index}>
              <strong>{item.timestamp}:</strong> {item.message}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={onSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default WebsocketPage;
