// @flow
import axios from 'axios'
import config from '../config'

export default function getRecipesFromIngredients(ingredients: string[], numResults:number = 5) {
    const ingredQueryString = ingredients.map(i => `i=${i}`).join('&')
    return axios.get(`${config.SERVER_URL}/recipes?${ingredQueryString}`, {
        headers: {
            "Content-Type": "application/json",
        },
        params: {
            r: numResults,
        }
    }).then(res => res.data)
}