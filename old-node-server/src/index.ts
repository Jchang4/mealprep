import express from 'express'
import figlet from 'figlet'

// Server Config
import config from './config'
import mongoConnection from './lib/mongo-connection'

// import Bluebird from 'bluebird'
import recipeApiProfileRepo from './services/recipe-api/recipe-api-profile/repo'
import recipeApiEventRepo from './services/recipe-api/recipe-api-event/repo'


const app = express();


app.get('*', async (req, res) => {
    res.json('Hello world')
    // res.json(await Bluebird.props({
    //     recipeApiEvents: recipeApiEventRepo.find({}),
    //     recipeApiProfiles: recipeApiProfileRepo.find({}),
    // }))
});


app.listen(config.PORT, () => {
    mongoConnection.connect()

    // Start Server
    console.log(figlet.textSync('Mealprep App', {
        font: 'Crawford'
    }))
    console.log(`Listening on port: ${config.PORT}`)
});