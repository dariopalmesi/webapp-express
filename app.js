const express = require('express');
const app = express();
const router = require('./routes/movies')
const HOST = process.env.HOST
const PORT = process.env.PORT




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/movies', router)

app.listen(PORT, () => {
    console.log(`Server started on port ${HOST}:${PORT}`);
})