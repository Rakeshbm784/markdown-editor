const express = require("express");
const app = express();
const port = 3001;

app.get("/convert", (req, res) => {
  const markdown = req.query.markdown;
  if (!markdown) {
    res.status(400).send("No markdown provided");
    return;
  }
  const html = markdownToHtml(markdown);
  res.send(html);
});

const markdownToHtml = (markdown) => {
  // Basic conversion logic
  return markdown
    .replace(/# /g, "<h1>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
};

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
