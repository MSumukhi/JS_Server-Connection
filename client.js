'use strict'; // Enable strict mode to enforce stricter parsing, error handling by JavaScript engine

// Import necessary modules
import fetch from 'node-fetch'; // Library to make HTTP requests
import readlineSync from 'readline-sync'; // Library for synchronous readline

// Global variables
let cookie = null; // Cookie for session management
let username = process.argv[2];
let password = process.argv[3]; // User password for authentication

/**
 * Function to send a POST request to a specified URL with provided data
 * @param {string} url - The URL to send the request to
 * @param {Object} data - Data to be sent in the request body
 * @returns {Promise} - Promise representing the HTTP response
 */
const getResponse = async (url, data = {}) => {
  // Prepare request parameter using URLSearchParams for constructing the request body
  let params = new URLSearchParams();
  // Append session cookie to data if available
  if (cookie) {
    data['wc_miehr_sumukhi_session_id'] = cookie;
  } else {
    params.append('login_user', username); // Add username
    params.append('login_passwd', password); // Add password
  }

  let options = {
    "body": params,
    "method": "POST"
  };

  // Send request and return the response
  return fetch(url, options);
};

/**
 * Function to prompt the user for password input
 * @returns {string} - The password entered by the user
 */
const getPassword = () => {
  return readlineSync.question('Enter your password for user ' + username + ': ', {
    hideEchoBack: true,
    mask: 'X'
  });
};

/**
 * Function to fetch data from a specified URL with authentication
 * @returns {Promise} - Promise representing the HTTP response
 */
const fetchData = async () => {
  try {
    // Authenticate with provided credentials
    password = getPassword(); // Get password from user
    const response = await getResponse('https://sumukhi.webchartnow.com/webchart.cgi');

    // Check if authentication was successful
    if (response.ok) {
      console.log('Authentication successful.');
      cookie = response.headers;
      return response; // Return the response object
    } else {
      console.log('Authentication failed. Please check your password.');
      return null; // Return null if authentication failed
    }
  } catch (error) {
    // Handle errors
    console.error('Error fetching data: ', error);
    return Promise.reject(error);
  }
};

// Main function
const main = async () => {
  try {
    const response = await fetchData();
    if (response) {
      // response if authentication was successful
      console.log(' Succesful Response');
    } else {
      // Handle authentication failure
      console.log('Authentication failed.');
    }
  } catch (error) {
    // Handle any errors from fetchData
    console.error('Error in fetchData:', error);
  }
};

// Execute main function
main();
