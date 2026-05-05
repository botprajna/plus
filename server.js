import 'dotenv/config';
import express from 'express';
import OpenAI from 'openai';
import * as undici from 'undici';

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';

app.use(express.json());
app.use(express.static('public'));

const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  fetchOptions: proxyUrl
    ? { dispatcher: new undici.ProxyAgent(proxyUrl) }
    : undefined
});

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message is required' });
  }

  try {
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || 'gpt-5.5',
      instructions: 'You are a helpful assistant for a web app prototype. Answer clearly and briefly.',
      input: message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error('OpenAI request failed:', error);
    res.status(error.status || 500).json({
      error: error.message || 'AI request failed'
    });
  }
});

app.listen(port, host, () => {
  console.log(`AI web starter running at http://${host}:${port}`);
});
