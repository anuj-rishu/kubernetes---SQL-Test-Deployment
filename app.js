const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

// Routes
app.use('/auth', authRoutes);

const PORT = 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
