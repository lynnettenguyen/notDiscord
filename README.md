# notDiscord

![notDiscord](https://user-images.githubusercontent.com/98368183/187108293-c0a43893-4b02-4e59-92d5-b819b628afe6.png)

[notDiscord Live Site!](https://not-discord-app.herokuapp.com/)

notDiscord is a full-stack clone of [Discord](https://discord.com/). Users can send direct messages to other users, create servers and server channels, and live chat in server channels. Users can also customize server information and channel name/topic. 

![landingPage](https://user-images.githubusercontent.com/98368183/187108525-ec2ae878-ff6f-49c9-b5c3-c5983e21adfb.png)

## Languages, Frameworks, Platforms and Libraries

### Backend
![Flask](https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white) ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)

### Frontend
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

### Database
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=A90000) ![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

### Libraries
![SocketIO](https://img.shields.io/badge/SocketIO-100000?style=for-the-badge&logo=sql&logoColor=BA1212&labelColor=AD0000&color=FFFFFF) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) 

### Hosting
![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Wiki Links:
* [notDiscord Wiki](https://github.com/lynnettenguyen/notDiscord/wiki)
* [Database Schema](https://github.com/lynnettenguyen/notDiscord/wiki/!Discord#database-schema)
* [Feature List](https://github.com/lynnettenguyen/notDiscord/wiki/Features-List)
* [User Stories](https://github.com/lynnettenguyen/notDiscord/wiki/User-Stories)

## Features
#### Register as a New User
![SignUp](https://user-images.githubusercontent.com/98368183/187110383-c20e9e4e-2ac1-40be-a625-e08ea9d5a3c3.png)

#### Login with Valid Credentials or Use Demo Login
![Login](https://user-images.githubusercontent.com/98368183/187110317-2c8a06ad-c717-4c19-8afe-d19886adaa42.png)

#### Loads User Session upon Login (Users, Direct Messages, Servers)
![MainPage](https://user-images.githubusercontent.com/98368183/187111832-235ed38d-9194-4bea-8c13-61ce77de1730.png)

#### Create a New Direct Message with Other Users
![newDM](https://user-images.githubusercontent.com/98368183/187112121-dd704c1b-931c-4feb-a520-29e81c1de188.png)

#### Live Direct Messaging with Other Users via SocketIO
![liveDM](https://user-images.githubusercontent.com/98368183/187112029-06b842b3-5dc3-4d47-9e74-a31db927b661.png)

#### Create a Server
![createServer](https://user-images.githubusercontent.com/98368183/187112281-efbd4803-0b14-4908-b5c6-aa0adb87535d.png)

#### Customize Server's Name and Image
![serverData](https://user-images.githubusercontent.com/98368183/187112289-cccf9bb4-2e27-4de7-95fd-2092be12967b.png)

#### Edit a Server's Name or Delete the Server
![editServer](https://user-images.githubusercontent.com/98368183/187112324-7b99cb95-701f-4d82-acb6-d169fd91c37b.png)

#### Create New Channels within Servers
![createChannel](https://user-images.githubusercontent.com/98368183/187112354-4eeec79f-1e5c-4610-85e8-dc9fedf52675.png)

#### Edit a Channel's Name or Topic
![editChannel](https://user-images.githubusercontent.com/98368183/187112358-8da0b2e7-9c09-4fab-aa1e-cbef73626933.png)

#### Live Channel Messaging via Socketio
![liveCM](https://user-images.githubusercontent.com/98368183/187111761-c651752b-094a-4b51-b3f9-7f2e7369ce54.png)

## Steps to clone locally:
1. Clone this repository:
```bash
git clone https://github.com/lynnettenguyen/notDiscord.git
```

2. Install backend dependencies:

```bash
pipenv install -r requirements.txt
```

3. Create a `.env` file based on the example with proper settings for development environment:
```
SECRET_KEY=INSERT_SECRET_KEY_HERE
DATABASE_URL=sqlite:///dev.db
```

4. Start pipenv, migrate database, seed database, and run Flask app:

```bash
pipenv shell
flask db upgrade
flask seed all
flask run
```

5. Install frontend dependencies: 

```bash
cd react-app/
npm install
npm start
```

6. Navigate to [localhost:3000](http://localhost:3000)
