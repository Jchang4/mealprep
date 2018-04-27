from flask import jsonify
from flask_restful import Resource
from mealprep.models.profile import Profile

class ProfileManyAPI(Resource):
    def get(self):
        profiles = Profile.query.all()
        return jsonify({
            'status': 200,
            'data': [p.to_dict() for p in profiles],
        })


class ProfileOneAPI(Resource):
    def get(self, profile_id):
        p = Profile.query.filter_by(id=profile_id).first()
        return jsonify({
            'status': 200,
            'data': p.to_dict(),
        })
