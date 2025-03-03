const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');
const fs = require('fs');

const app = express();

// Setup Handlebars
app.engine('handlebars', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Load stores from JSON file
const stores = JSON.parse(fs.readFileSync('stores.json', 'utf8'));

// Home Route
app.get('/', (req, res) => {
    res.render('home', { title: 'Welcome to Jönköping Stores' });
});

// Stores Route
app.get('/stores', (req, res) => {
    res.render('stores', { title: 'Stores in Jönköping', stores });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
