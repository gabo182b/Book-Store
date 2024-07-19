import express from "express"
import mongoose from "mongoose"
import booksRoute from "./routes/booksRoute.js"
import cors from "cors"
const PORT = 5555

const mongoDBURL = 'mongodb+srv://root:OaDhsbzhKOo2Dmki@bookstore.pn7t8qn.mongodb.net/?retryWrites=true&w=majority&appName=Bookstore'

const app = express()

// Middleware to parse request body
app.use(express.json())

// Cors middleware
app.use(cors())

app.get('/', (request, response) => {
  console.log(request)
  return response.status(234).send('Up and running')
})

// Route middleware
app.use('/books', booksRoute)

mongoose.connect(mongoDBURL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Listening on port: ${PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })