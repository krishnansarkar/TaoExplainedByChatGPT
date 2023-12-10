import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.json());

const apiEndpoint = "https://api.openai.com/v1/chat/completions";
//const apiKey = "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";

app.post("/analysis", async (req, res) => {
  //console.log(req.body.data);
  //console.log(req);
  const randomQuote = req.body.quote;
  const apiKey = req.body.apikey;
  console.log(`API Key is ${apiKey}`);
  res.type("json");
  /*res.send({
    analysis: randomQuote
  })*/
  try {
    const response = await axios.post(
      apiEndpoint,
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            "role": "system",
            "content": "Explain the meaning of the Taoist quote you are provided."
          },
          {
            "role": "user",
            "content": randomQuote,
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`,
        }
      }
    );
    const result = response.data;
    const analysis = result.choices[0].message.content
    console.log(analysis);
    res.send({
      analysis: analysis
    });
  } catch (error) {
    if (error.response) {
      // The request was made, but the server responded with a non-2xx status code
      console.error('Error response data:', error.response.data);
      console.error('Error response status:', error.response.status);
      console.error('Error response headers:', error.response.headers);
      res.send({
        analysis: "Something went wrong."
      });
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('Error request data:', error.request);
      res.send({
        analysis: "Something went wrong."
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      res.send({
        analysis: "Something went wrong."
      });
    }
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.get("/", async (req, res) => {
  const randomQuote = taoQuotes[Math.floor(Math.random() * taoQuotes.length)]
  res.render("index.ejs", {
    quote: randomQuote
  });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const taoQuotes = [
  `"Simplicity, patience, compassion.
    These three are your greatest treasures.
    Simple in actions and thoughts, you return to the source of being.
    Patient with both friends and enemies,
    you accord with the way things are.
    Compassionate toward yourself,
    you reconcile all beings in the world."`
];