require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const cors = require('cors');
const routes = require('./src/routes/routes');
const app = express();
const PORT = process.env.PORT || 3004;

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Publishine API',
            version: '1.0.0',
            description: 'A simple Publishine API in Express',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {}).then(() => console.log('Connected to MongoDB')).catch((err) => console.error('Could not connect to MongoDB', err));
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger UI available at https://api.sprinsoft.com/api-docs`);
});