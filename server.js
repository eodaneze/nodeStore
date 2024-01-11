const express = require('express');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express();

app.use(express.json());

app.post('/profile', upload.array('file', 12), function (req, res, next) {
       res.send("file uploaded successfully");
  })
const port = 6000


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})