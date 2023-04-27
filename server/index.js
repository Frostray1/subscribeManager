require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const router = require('./router/index')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error-middleware')


const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/api', router)
app.use(errorMiddleware)

const start = async () => {
	try {
		await mongoose.connect(process.env.URL_DATABASE)
		app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))
	} catch (e) {
		console.log(e)
	}
}

start()
