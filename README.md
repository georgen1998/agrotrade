# Agrotrade Application

This repository contains the source code for the Agrotrade application, which includes both the frontend and backend components. The frontend is built with Vue 2, and the backend is built with Node.js and Express, using JSON Web Token for authentication.

The application is live at [agrotrade.entrustgroup.gr](http://agrotrade.entrustgroup.gr) and the API can be accessed at [agrotrade.shopitnow.gr/api](https://agrotrade.shopitnow.gr/api).

# Authors
- Georgios Natsikou AM:3160113
- Gerasimos Potamianos AM:3200160

# Clone the repository: 
```bash
git clone https://github.com/georgen1998/agrotrade.git
```

## Run backend server (api)
```bash
cd agrotrade_backend
npm install
npm run dev
```

## Run vue frontend (for development)
```bash
cd agrotrade_frontend
npm install
npm run serve
```
### Compiles and minifies for production
```bash
npm run build
```


## Configure API URL
Depending on whether you want to run the frontend with the live API or a local development API, follow these steps:
- Open agrotrade-frontend/src/services/Api.js 
- Change baseURL: 'https://agrotrade.shopitnow.gr/api' or baseURL: 'http://localhost:8081/api' accordingly.
- Uncomment the baseURL line by removing the // at the beginning of the line and comment the other one.


## Live Database Access
For live database access, visit [phpMyAdmin](https://ns1.entrustgroup.gr/smb/database/webadmin/id/4)
- Username: CRM
- Password: CRM123CRM


## Backend Folder and Files Structure
- `server.js`: The entry point of the application. It sets up the server, connects to the database, and starts listening for incoming requests.
- `src/app.js`: Initializes the Express application, sets up middleware, and defines the routes.
- `src/config`: Contains configuration files.
- `src/controllers`: Contains the logic for handling requests and responses.
- `src/middleware`: Contains middleware functions for processing requests.
- `src/models`: Contains database models.
- `src/routes`: Contains route definitions.
- `src/uploads`: Directory for storing uploaded files.
- `.env`: Environment variables file that stores sensitive or configuration-specific information.
- `package.json`: Configuration file for npm that includes the dependencies and scripts required to build, test, and run the frontend application.


## Frontend Folder and Files Structure
- `public/index.html`: The main HTML file that serves as the entry point for the application. Built files will be auto injected here.
- `src/assets/`: Contains static assets such as images, fonts, and global stylesheets used throughout the application.
- `src/components/`: Contains reusable Vue components that can be used across different pages or views of the application.
- `src/router/`: Contains the Vue Router configuration. Defines the application's navigation paths and corresponding components.
- `src/pages/`: Contains main views or pages of the application. Each page typically corresponds to a route defined in the Vue Router.
- `src/services/`: Contains API service modules that handle communication with the backend API. These modules encapsulate API endpoints and return responses to components.
- `src/App.vue`: The root Vue component that acts as the container for all other components. It typically includes the router-view to render the matched component for the current route.
- `src/main.js`: The entry point of the Vue application where Vue is instantiated and configured. It may include global configurations or plugins like Vuex for state management.
- `package.json`: Configuration file for npm that includes the dependencies and scripts required to build, test, and run the frontend application.