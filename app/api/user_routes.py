from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User


user_routes = Blueprint('users', __name__)


@user_routes.route('')
# @login_required
def users():
    users = User.query.order_by(User.username).all()
    result = [user.to_dict() for user in users]
    return jsonify(result)


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()
