import bodyParser from "body-parser";
import express from "express";
import { api } from "./api/api";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc"
import { Calendar } from "./db/calendar";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Calendar API",
            version: "1.0.0",
            description: "Swagger Calendar API"
        },
        servers: [{
            url: "http://localhost:3000"
        }],
    },
    apis: ["**/*.ts"]
}

const specs = swaggerJsDoc(swaggerOptions)
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api)
app.use('/', swaggerUI.serve, swaggerUI.setup(specs))

Calendar.sync()
app.listen(PORT, () => {
    console.log(`Server started \nhttp://localhost:${PORT}/`)
})