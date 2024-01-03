const express = require("express");
const app = express();

app.set('view engine', 'ejs');

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.get("", (req, res) => {
  res.render("index.ejs");
});

app.listen(3000, () => {
  console.log('SERVER LISTENING AT PORT no : 3000');
});