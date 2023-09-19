# Property classifier
Simple app to add/list your home/property.
Client in React. UI using chakra.
Server in nodejs and express, uses mongo database. Functions also as a proxy server to handle fetch area list.

# Features
* Login/Signup (with jwt and bcrypt)
* See all saved ads
* Add/list your home ad
* Delete home ad

## screenshots

![image](https://github.com/FationSH/PropertyApp/blob/master/login_page.png)

![image](https://github.com/FationSH/PropertyApp/blob/master/home_page.png)

![image](https://github.com/FationSH/PropertyApp/blob/master/add_property_page.png)

![image](https://github.com/FationSH/PropertyApp/blob/master/register_page.png)

## How to Run
Install on your pc (Windows)
NodeJS: 18.14.0
MongoDB: 7.0.1

### server
cd server
npm install
npm start

### client:
cd client
npm install
npm run dev

# Tech Stack
*Client*: React, React-router-dom, Chakra-UI

*Server*: Node, Express, MongoDB, JWT, http-proxy-middleware
