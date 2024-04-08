// Import necessary modules
import axios from 'axios'; // Library for making HTTP requests
import readlineSync from 'readline-sync'; // Library for synchronous readline

// Global variables
let cookie = null; // Cookie for session management
let username = null;
let password = null; // User password for authentication
const apiUrl = process.argv[2]; // API URL

/**
 * Function to send a POST request to a specified URL with provided data
 * @param {Object} data - Data to be sent in the request body
 * @param {Object} headers - Optional headers to be sent with the request
 * @returns {Promise} - Promise representing the HTTP response
 */
const getResponse = async (data = {}, headers = {}) => {
    // Prepare request parameter using URLSearchParams for constructing the request body
    const params = new URLSearchParams();
    
    // Append session cookie to headers if available
    if (cookie) {
        headers['Cookie'] = `wc_miehr_sumukhi_session_id=${cookie}`;
    } else {
        // Add username and password to the request body if cookie is not available
        params.append('login_user', data['login_user']); // Add username
        params.append('login_passwd', data['login_passwd']); // Add password
    }
    
    const options = {
        headers: headers,
        method: 'POST',
        data: params
    };

    // Send request and return the response
    return axios(apiUrl, options);
};

/**
 * Function to prompt the user for password input and store it
 */
const getPassword = () => {
    // Use readlineSync to prompt for password input and mask it with 'X'
    password = readlineSync.question('Enter your password for user ' + username + ':', {
        hideEchoBack: true,
        mask: 'X'
    });
};

// Prompt user for password input
getPassword();

// Authenticate user and obtain session cookie
getResponse({ 'login_user': username, 'login_passwd': password })
    .then(response => {
        // Check if authentication was successful
        if (response && response.status === 200) {
            console.log('Authentication successful.');
            if (response.headers['set-cookie']) {
                cookie = response.headers['set-cookie'][0].split('=')[1].split(';')[0];
                //console.log('cookie:', cookie);
            } else {
                console.log('Set-cookie header not found or empty.');
            }
        } else {
            console.log('Authentication failed. Please check your password.');
        }
    })
    .then(() => {
        // Make another request using the obtained cookie
        if (cookie) {
            //console.log('Attempting second request using cookie:', cookie);
            return getResponse();
        } else {
            //console.log('Cookie not available. Cannot make the second request.');
            throw new Error('Cookie not available. Cannot make the second request.');
        }
    })
    .then(response => {
        // Handle the response of the second request
        if (response && response.status === 200) {
            console.log('Second request successful.');
            // Log the response after the second request
            //console.log('Response after second request:', response);
        } else {
            console.log('Second request failed.');
            // Handle failure
        }
    })
    .catch(error => {
        // Handle errors
        console.error('Error during authentication or second request: ', error);
    });
