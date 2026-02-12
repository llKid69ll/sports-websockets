import express from 'express';

const app = express();
const port = 8000;

// JSON middleware
app.use(express.json());

// Root GET route
app.get('/', (req, res) => {
    res.send( "Server is running successfully ");
});

// Start server
app.listen(port, () => {
    console.log(`Server started at: http://localhost:${port}`);
});