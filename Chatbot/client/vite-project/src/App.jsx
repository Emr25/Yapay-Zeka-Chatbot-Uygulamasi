import React, { useState } from "react";
import axios from "axios";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await axios.post("http://localhost:5000/chat", { message });
      setResponse(res.data.response);
    } catch (error) {
      setResponse("Yanıt alınamadı. Server çalışıyor mu?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Ollama Chatbot</h1>
      <textarea
        rows="4"
        cols="50"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mesajınızı yazın..."
      />
      <br />
      <button onClick={sendMessage} style={{ marginTop: "10px" }} disabled={loading}>
        {loading ? "Yanıt bekleniyor..." : "Gönder"}
      </button>
      <h2>Cevap:</h2>
      <p>{response}</p>
    </div>
  );
}

export default App;
