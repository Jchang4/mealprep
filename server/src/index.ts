import express from 'express'

// Prettify Things
import figlet from 'figlet'

// Get Config
import config from './config'

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(config.PORT, () => {
    console.log(`Example app listening on port ${port}!`)
    console.log(figlet('Meal Prep Server'))
})