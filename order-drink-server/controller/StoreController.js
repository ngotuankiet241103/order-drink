const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { run } = require('../gemini/gemini-config'); // Import the run function
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'dzumda5fa', // Replace with your Cloudinary cloud name
    api_key: '959631823469922', // Replace with your Cloudinary API key
    api_secret: 'NFULtoFFUlC6qCPN1BSiRw5KUGk' // Replace with your Cloudinary API secret
});
// Mock database
let stores = [];

// POST method to add a new store
router.post('/store', (req, res) => {
    const store = req.body;
    stores.push(store);
    res.status(201).send(store);
});

// GET method to retrieve all stores
router.get('/stores', (req, res) => {
    res.status(200).send(stores);
});

// FILE method to upload a file and process it with Gemini
router.post('/stores/upload', upload.single('file'), async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        // Upload the file to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'uploads' // Optional: specify a folder in Cloudinary
        });
        
        
        // Process the file with Gemini
        const geminiResult = await run(req.file.path); // Pass the Cloudinary URL to the run function
        const jsonStart = geminiResult.indexOf('{');
        const jsonEnd = geminiResult.lastIndexOf('}') + 1;
        const jsonResponse = geminiResult.substring(jsonStart, jsonEnd);

        const response = JSON.parse(jsonResponse);
        res.status(200).json({...response, image: result.secure_url});
    } catch (error) {
        res.status(500).send(`Error processing file: ${error.message}`);
    }
});

module.exports = router;