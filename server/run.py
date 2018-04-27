from mealprep.mealprep import app

if __name__ == '__main__':
    # app.run(debug=True, host="0.0.0.0", port=8080)

    from mealprep.models import db, Profile
    from pprint import pprint

    # from pprint import pprint
    pprint([p.to_dict() for p in Profile.query.all()])

    # new_profile = Profile('Harry', 'harry@hogwarts.com')
    # new_profile.last_name = 'Potter'
    # s = db.session
    # s.add(new_profile)
    # s.commit()
