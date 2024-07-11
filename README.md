# Connecting to Server Through Node.js

This repository demonstrates different methods for connecting to a server using Node.js and performing authentication. It includes scripts utilizing the Fetch API, Axios with Bearer token authentication, and Axios with CookieJar authentication.

## Prerequisites

- Node.js installed on your system
- Knowledge of JavaScript programming language

## Fetch API Script (client.js)
The `client.js` script demonstrates how to connect to a server using the Fetch API in Node.js. It includes functionality for authentication with the server and making HTTP requests.

### Usage
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open a terminal window.
4. Run the following command to install dependencies: `npm install`
5. Run the script using the following command: `node client.js <username>`
6. When prompted, enter the password for the user.

### Description
- Uses node-fetch library to make HTTP requests.
- Utilizes readline-sync library to prompt the user for password input securely.
- Sends a POST request to a specified URL with authentication credentials.
- Handles authentication success and failure scenarios appropriately.

## Axios Script with Bearer Token (Bearertoken.js)
The `Bearertoken.js` script demonstrates how to connect to a server using Axios with Bearer token authentication. It includes functionality for authentication with the server and making POST requests.

### Usage
Follow the same usage instructions as for the Fetch API Script (`client.js`).

### Description
- Uses Axios library to make HTTP requests with Bearer token authentication.
- Prompts the user for password input securely.
- Sends a POST request to a specified URL with authentication credentials.
- Handles authentication success and failure scenarios appropriately.

## Axios Script with CookieJar (Cookiejar.js)
The `Cookiejar.js` script demonstrates how to connect to a server using Axios with CookieJar authentication. It includes functionality for authentication with the server and making POST requests.

### Usage
Follow the same usage instructions as for the Fetch API Script (`client.js`)

### Description
- Uses Axios library to make HTTP requests with CookieJar authentication.
- Prompts the user for password input securely.
- Sends a POST request to a specified URL with authentication credentials.
- Handles authentication success and failure scenarios appropriately.

## File Structure
- `client.js`: Script utilizing the Fetch API for server connection.
- `Bearertoken.js`: Script utilizing Axios with Bearer token authentication.
- `Cookiejar.js`: Script utilizing Axios with CookieJar authentication.
- `package.json`: Node.js package configuration file.
- `package-lock.json`: Automatically generated file based on the exact versions of dependencies installed.

## Author
Sumukhi Sri Sai Mathapati

## Acknowledgements
- [Node.js](https://nodejs.org/): JavaScript runtime environment
- [node-fetch](https://www.npmjs.com/package/node-fetch): Fetch Library for making HTTP requests in Node.js
- [axios](https://github.com/axios/axios): Axios Library for making HTTP requests in Node.js
- [readline-sync](https://www.npmjs.com/package/readline-sync): Library for synchronous readline in Node.js
