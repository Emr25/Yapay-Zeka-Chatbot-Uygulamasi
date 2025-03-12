const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage) {
        return res.status(400).json({ error: "Mesaj içeriği boş olamaz." });
    }

    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "mistral", // Ollama'da hangi modeli kullanmak istiyorsan onu yaz
            prompt: userMessage,
            stream: false
        });

        res.json({ response: response.data.response });
    } catch (error) {
        res.status(500).json({ error: "Ollama API'ye bağlanırken hata oluştu." });
    }
});

app.listen(PORT, () => {
    console.log(`Server ${PORT} portunda çalışıyor...`);
});
