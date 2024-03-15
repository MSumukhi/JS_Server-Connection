# Connecting to Server Through Node.js

This script demonstrates how to connect to a server using Node.js and perform authentication using both the Fetch API and Axios.

## Prerequisites

- Node.js installed on your system
- Knowledge of JavaScript programming language

## Fetch API Script

The `client.js` script demonstrates how to connect to a server using the Fetch API in Node.js. It includes functionality for authentication with the server and making HTTP requests.

## Usage

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open a terminal window.
4. Run the following command to install dependencies:
    `npm install`

5. Run the script using the following command:
    `node your_script.js`

6. When prompted, enter the password for user `User`.

## Description

The scripts includes the following functionalities:

- Uses `node-fetch` and `axios` library to make HTTP requests.
- Utilizes `readline-sync` library to prompt the user for password input securely.
- Sends a POST request to a specified URL with authentication credentials.
- Handles authentication success and failure scenarios appropriately.

## File Structure

- `your_script.js`: Main JavaScript file containing the scripts.
- `package.json`: Node.js package configuration file.
- `package-lock.json`: Automatically generated file based on the exact versions of dependencies installed.

## Configuration

Ensure that the following variables are correctly configured in the script:

- `url`: The URL of the server to connect to.
- `login_user`: The username for authentication.
- `login_passwd`: The password for authentication.

## Author

Sumukhi Sri Sai Mathapati

## Acknowledgements

- [Node.js](https://nodejs.org/): JavaScript runtime environment
- [node-fetch](https://www.npmjs.com/package/node-fetch): Fetch Library for making HTTP requests in Node.js
- [axios](https://www.npmjs.com/package/axios):Axios Library for making HTTP requests in Node.js
- [readline-sync](https://www.npmjs.com/package/readline-sync): Library for synchronous readline in Node.js

