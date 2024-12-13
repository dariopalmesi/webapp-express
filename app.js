const express = require('express');
const app = express();
const router = require('./routes/movies.js')
const NotFound = require('./middleware/NotFound.js')
const ServerErrorHandlers = require('./middleware/ServerErrorHandlers.js')
const cors = require('cors')
const HOST = process.env.HOST
const PORT = process.env.PORT




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(cors())
app.use(express.json())


app.use('/movies', router)

app.use(NotFound)

app.use(ServerErrorHandlers)



app.listen(PORT, () => {
    console.log(`Server started on port ${HOST}:${PORT}`);
})