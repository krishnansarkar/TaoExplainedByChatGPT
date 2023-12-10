document.getElementById("analyze-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const quote = document.getElementById("quote");
  const analysis = document.getElementById("analysis");
  analysis.innerText = "Loading Analysis..."
  try {
    const response = await fetch("/analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          apikey: formData.get("apikey"),
          quote: quote.textContent
        })
      }
    );
    const data = await response.json();
    analysis.innerText = data.analysis;
  } catch (error) {
    console.error(error.message);
  }
});