const express = require('express');
const cors = require('cors');
const path = require('path'); // Ensure the correct path is used for language files
const app = express();

app.use(cors());
app.use("/test",(req,res)=>{
  res.send("i am from backend test")
})
app.get('/content/:lang', (req, res) => {
  const lang = req.params.lang;
  try {
    const contentPath = path.resolve(__dirname, `${lang}.js`);
    const content = require(contentPath);
    res.json(content);
  } catch (error) {
    console.error(`Error loading content for language: ${lang}`, error);
    const defaultContentPath = path.resolve(__dirname, 'en.js');
    const defaultContent = require(defaultContentPath);
    res.json(defaultContent);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
