const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use('/test',(req,res)=>{
  res.send("i am working for you !")
})
app.get('/content/:lang/:section', (req, res) => {
  const lang = req.params.lang;
  const section = req.params.section;
  try {
    const contentPath = path.resolve(__dirname, `${lang}.js`);
    const content = require(contentPath);
    if (content[section]) {
      res.json(content[section]);
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (error) {
    console.error(`Error loading content for language: ${lang}`, error);
    const defaultContentPath = path.resolve(__dirname, 'en.js');
    const defaultContent = require(defaultContentPath);
    res.json(defaultContent[section] || { error: "Section not found" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});