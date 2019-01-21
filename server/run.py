from flask import Flask, jsonify, request

from services.scrapers.all_recipe.get_recipes_from_ingredients import (
    get_recipes_from_ingredients,
)

app = Flask(__name__)


@app.route("/recipes", methods=["GET"])
def get_recipes_from_ingredients():
    ingredients = request.args.get("i") or request.args.get("ingreds")
    num_results = request.args.get("r") or request.args.get("results")
    if not ingredients:
        return jsonify(
            {"status": 400, "error": "Must provide at least one ingredient."}
        )

    recipes = get_recipes_from_ingredients(
        ingredients, num_results=int(num_results) or 5
    )
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
