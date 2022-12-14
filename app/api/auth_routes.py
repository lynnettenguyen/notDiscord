from flask import Blueprint, request
from app.models import User, db
from app.forms import LoginForm, SignUpForm
from flask_login import current_user, login_user, logout_user


auth_routes = Blueprint('auth', __name__)


# turns the WTForms validation errors into a simple list
def validation_errors_to_error_messages(validation_errors):
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages

# authenticates a user
@auth_routes.route('/')
def authenticate():
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    form = LoginForm()
    # get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# logs a user out
@auth_routes.route('/logout')
def logout():
    logout_user()
    return {'message': 'User logged out'}


# creates a new user and logs them in
@auth_routes.route('/register', methods=['POST'])
def sign_up():
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        user = User(
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password'],
            profile_pic=form.data['profile_pic']
        )
        db.session.add(user)
        db.session.commit()
        login_user(user)
        return user.to_dict()

    else:
        print(form)

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# returns unauthorized JSON when flask-login authentication fails
@auth_routes.route('/unauthorized')
def unauthorized():
    return {'errors': ['Unauthorized']}, 401
