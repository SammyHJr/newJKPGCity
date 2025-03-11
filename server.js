const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

// Setup Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main', // Main layout is applied to all views
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, images)
app.use(express.static(path.join(__dirname, 'public')));

// Load stores from JSON file
const storesFilePath = path.join(__dirname, 'stores.json');

// Home Route
app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome to Jönköping Stores' });
});

// Stores Route
app.get('/stores', (req, res) => {
    res.render('stores', { title: 'Stores in Jönköping' });
});

// REST API to fetch stores (Backend)
app.get('/api/stores', (req, res) => {
    fs.readFile(storesFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error("❌ Error loading stores.json:", err);
            return res.status(500).json({ error: "Error loading stores" });
        }
        const stores = JSON.parse(data);
        res.json(stores); // Return JSON response
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
