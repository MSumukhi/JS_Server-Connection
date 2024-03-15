// Import necessary modules
import axios from 'axios'; // Library for making HTTP requests
import readlineSync from 'readline-sync'; // Library for synchronous readline

// Global variables
let cookie = null; // Cookie for session management
let password = null; // User password for authentication

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
    let headers = {};
    if (cookie) {
        headers['Cookie'] = `wc_miehr_sumukhi_session_id=${cookie}`;
    } else {
        params.append('login_user', data['login_user']); // Add username
        params.append('login_passwd', data['login_passwd']); // Add password
    }
    
    let options = {
        headers: headers,
        method: "POST",
        data: params
    };

    // Send request and return the response
    return axios(url, options);
};

/**
 * Function to prompt the user for password input and store it
 */
const getPassword = () => {
    // Use readlineSync to prompt for password input and mask it with 'X'
    password = readlineSync.question('Enter your password for user Sumu1231: ', {
        hideEchoBack: true,
        mask: 'X'
    });
};


// Prompt user for password input
getPassword();

getResponse('https://sumukhi.webchartnow.com/webchart.cgi', { 'login_user': 'Sumu1231', 'login_passwd': password })
    .then(response => {
        // Check if authentication was successful
        if (response && response.status === 200) {
            console.log('Authentication successful.');
            console.log(response);
            if (response.headers['set-cookie']) {
                cookie = response.headers['set-cookie'][0].split('=')[1].split(';')[0];
                console.log('cookie:', cookie);
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
            console.log('Attempting second request using cookie:', cookie);
            return getResponse('https://sumukhi.webchartnow.com/webchart.cgi');
        } else {
            console.log('Cookie not available. Cannot make the second request.');
            throw new Error('Cookie not available. Cannot make the second request.');
        }
    })
    .then(response => {
        // Handle the response of the second request
        if (response && response.status === 200) {
            console.log('Second request successful.');
            console.log(response);
            // Handle further processing here
        } else {
            console.log('Second request failed.');
            // Handle failure
        }
    })
    .catch(error => {
        // Handle errors
        console.error('Error during authentication or second request: ', error);
    });
