from mealprep.mealprep import app
from mealprep.models import Profile



if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)
