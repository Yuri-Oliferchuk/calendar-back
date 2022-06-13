import bodyParser from "body-parser";
import express from "express";
import { api } from "./api/api";

const app = express()
const PORT = process.env.PORT || 3000

// add body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api)

app.get('/', (req, res) => {
    res.send('Hello world!!!!')
})

app.listen(PORT, () => {
    console.log(`Server started \nhttp://localhost:${PORT}/`)
})