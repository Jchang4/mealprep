import express from 'express'
import figlet from 'figlet'

// Server Config
import config from './config'
import mongoConnection from './lib/mongo-connection'


const app = express();


app.get('/', (req, res) => {
    res.send('Hello World!')
});


const server = app.listen(config.PORT, () => {
    mongoConnection.connect()

    server.close(() => {
        mongoConnection.close()
    })

    console.log(figlet.textSync('Mealprep App', {
        font: 'Crawford'
    }))
    console.log(`Listening on port: ${config.PORT}`)
});

console.log('this is diff')