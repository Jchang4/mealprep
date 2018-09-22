import express from 'express'
import figlet from 'figlet'

// Server Config
import config from './config'


const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(config.PORT, () => {
    console.log(figlet.textSync('Mealprep App', {
        font: 'Crawford'
    }))
    console.log(`Listening on port: ${config.PORT}`)
});
