import express from 'express'
import figlet from 'figlet'

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.listen(3000, () => {
    console.log(figlet.textSync('Mealprep App'))
});
