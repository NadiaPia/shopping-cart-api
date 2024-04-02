"Shopping Cart API" is an API that serves a 'Shoping Cart' Frontend. It uses MySQL database to store user's data. Users are able to download their product's pictures.
Pictures are uploaded to the cloudinary cloud storage, but url addresses are keep in the MySQL database. Users can add and delete their products from their carts.
This server uses libraries and frameworks as Express.js, sequelize, jsonwebtoken (for users authorization). Other dependencies are:
"dependencies": {
    "axios": "^1.4.0",
    "bcrypt": "^5.1.0",
    "body-parser": "^1.20.2",
    "cloudinary": "^1.37.0",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-session": "^1.17.3",
    "jsonwebtoken": "^9.0.0",
    "mysql2": "^3.3.1",
    "nodemon": "^2.0.22",
    "sequelize": "^6.31.1",
    "sequelize-cli": "^6.6.0",
    "session": "^0.1.0",
    "stripe": "^12.9.0"
  }

  To start a server install MySQL database, run npm install and then npm start. 
  This project was deployed on the Firebase (FE) and Heroku (BE): [Link to deployed prject](https://shopping-hunter.web.app/).

  
