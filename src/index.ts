import bodyParser from "body-parser";
import express from "express";
import { api } from "./api/api";
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc"
import { Calendar } from "./db/calendar";

const app = express()
const PORT = process.env.PORT || 3000

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Calendar API",
            version: "1.0.0",
            description: "Swagger Calendar API"
        },
        servers: [{
            url: `http://localhost:${PORT}`
        }],
    },
    apis: ["**/*.ts"]
}

const specs = swaggerJsDoc(swaggerOptions)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api)
app.use('/', swaggerUI.serve, swaggerUI.setup(specs))

Calendar.sync()
app.listen(PORT, () => {
    console.log(`Server started \nhttp://localhost:${PORT}/`)
})