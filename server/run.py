from flask import Flask, jsonify, request
from flask_cors import CORS

from services.scrapers.all_recipe.get_recipes_from_ingredients import (
    get_recipes_from_ingredients as get_recipes,
)

app = Flask(__name__)
cors = CORS(app, resources={"*": {"origins": "*"}})


@app.route("/recipes", methods=["GET"])
def get_recipes_from_ingredients():
    ingredients = request.args.getlist("i")
    num_results = request.args.get("r", 5)
    if not ingredients:
        return jsonify(
            {"status": 400, "error": "Must provide at least one ingredient."}
        )
    print(ingredients)
    recipes = get_recipes(ingredients, num_results=int(num_results))
    if recipes:
        return jsonify({"status": 200, "data": recipes})

    return jsonify(
        {
            "status": 500,
            "error": "Server Error: Could not scrape sites for recipes. Uh oh!",
        }
    )


if __name__ == "__main__":
    app.run(debug=True)
