const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/database/index');
const routes = require('./src/routes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(routes);

async function startServer() {
    try {
        await sequelize.sync();
        console.log('Database synced successfully.');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();
