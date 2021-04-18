const express = require('express')
const connectDB = require('./config/db')
const path = require('path')

const app = express()

// init middleware
app.use(express.json({ extended: false }))

// connect db
connectDB()

app.get('/', (req, res) => {
    res.send('API Running')
})

// Define Routes
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/posts', require('./routes/posts'))
app.use('/api/profile', require('./routes/profile'))

// servestatic astes in prod
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})