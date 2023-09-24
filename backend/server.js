const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

var base64Img = require('base64-img');

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/images', express.static('./images'));
         
app.use(bodyParser.json());

app.post('/base64_to_image', (req, res) => {
    console.log()
    const { image } = req.body;
    if (!image) {
        return res.status(400).json({ error: 'Image data is missing' });
    }
    // const now = new Date();
    // const dateFormatted = now.toISOString().replace(/[:.]/g, '-');
    const filename = `image`;
    const directoryPath = './images';
    const filePath = path.join(directoryPath, filename);
    base64Img.img(image, directoryPath, filename, function (err, filepath) { });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



















