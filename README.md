# notDiscord
[Try the site live here!](https://not-discord-app.herokuapp.com/)
![Screen Shot 2022-08-28 at 6 28 31 PM](https://user-images.githubusercontent.com/32751992/187105320-977f5259-28b2-4dc8-b8b1-89f771cec32a.png)

notDiscord is a full-stack clone of [Discord](https://discord.com/). Users can create an account and send direct messages to other users, create servers and server channels, and live chat in server channels. Users can also customize their profile picture, server information and channel name/topic. 

## Technologies Used
- Socketio
- React 
- Redux 
- SQLAlchemy
- Flask
- Javascript 
- Python
- HTML
- CSS  

## Wiki Links of the Project:
* [notDiscord Wiki](https://github.com/lynnettenguyen/notDiscord/wiki)
* [Database Schema](https://github.com/lynnettenguyen/notDiscord/wiki/!Discord#database-schema)
* [Feature List](https://github.com/lynnettenguyen/notDiscord/wiki/Features-List)
* [User Stories](https://github.com/lynnettenguyen/notDiscord/wiki/User-Stories)

## Features

- Loads User Data upon login (Servers, Users, and Direct Messages)
![friends](https://user-images.githubusercontent.com/32751992/187104032-fbaccdad-cdc6-4ce9-be62-084f65cd1d66.png)

- Create a Server
![create-a-server](https://user-images.githubusercontent.com/32751992/187103617-dfc1f7e5-55a3-4ab6-bdc6-80df504192f3.png)

- Create a Channel in a Server
![create-channel](https://user-images.githubusercontent.com/32751992/187103690-b157d9da-76a0-4e5e-9c90-758f2de1cc0d.png)

- Edit a Server (Change name and delete)
![edit-server](https://user-images.githubusercontent.com/32751992/187103718-06568870-17a0-418e-845c-d5af74ec2adc.png)

- Edit a Channel (Change name and delete)
![edit-channel](https://user-images.githubusercontent.com/32751992/187103748-3059e012-c45c-4ecc-9fc6-d065931fe6df.png)

- Live Channel Messaging using Socketio
![persistent-chat](https://user-images.githubusercontent.com/32751992/187103821-6e2e4928-5de6-4fdb-b572-75e6cb55c3e6.png)

- Live Private Messaging using Socketio
![live-chat](https://user-images.githubusercontent.com/32751992/187103549-d5f8f255-c34b-49cb-9db4-cc65c0144103.png)


## Steps to clone locally:
1. Clone this repository

   ```bash
   git clone https://github.com/lynnettenguyen/notDiscord.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

5. To run the React App in development, navigate to the `react-app` directory and run `npm install` then `npm start`.


<br>

