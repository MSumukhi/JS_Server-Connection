// Import necessary modules
import axios from 'axios'; // Library for making HTTP requests
import readlineSync from 'readline-sync'; // Library for synchronous readline

// Global variables
let bearerToken = null; // Bearer token for authentication

/**
 * Function to send a POST request to obtain bearer token
 * @param {string} url - The URL to send the request to
 * @param {Object} data - Data to be sent in the request body
 * @returns {Promise} - Promise representing the HTTP response
 */
const getResponse = async (url, data = {}) => {
    // Prepare request parameter using URLSearchParams for constructing the request body
    const params = new URLSearchParams();
    // Add username and password to the request body
    let headers = {};
    if (!bearerToken) {
        params.append('login_user', data['login_user']); // Add username
        params.append('login_passwd', data['login_passwd']); // Add password
    } else {
        headers['Authorization'] = `Bearer ${bearerToken}`;
    }
    console.log(headers);
    let options = {
        headers: headers,
        method: "POST",
        data: params
    };

    return axios(url, options);
};

// Function to prompt the user for password input and store it
const getPassword = () => {
    // Use readlineSync to prompt for password input and mask it with 'X'
    return readlineSync.question('Enter your password for user Sumu1231: ', {
        hideEchoBack: true,
        mask: 'X'
    });
};

// Authenticate user and obtain bearer token
getResponse('https://sumukhi.webch.art/webchart.cgi', { 'login_user': 'Sumu1231', 'login_passwd': getPassword() })
    .then(response => {
        // Check if authentication was successful
        if (response && response.status === 200) {
            console.log('Authentication successful.');
            if (response.headers['set-cookie']) {
                bearerToken = response.headers['set-cookie'][0].split('=')[1].split(';')[0];
                console.log('BearerToken:', bearerToken);
            } else {
                console.log('Set-cookie header not found or empty.');
            }
        } else {
            console.log('Authentication failed. Please check your password.');
        }
    })
    .then(() => {
        // Make another request using the obtained bearer token
        if (bearerToken) {
            console.log('Attempting second request using bearerToken:', bearerToken);
            return getResponse('https://sumukhi.webch.art/webchart.cgi', {
                headers: {
                    Authorization: `Bearer ${bearerToken}`
                }
            });
        } else {
            console.log('BearerToken not available. Cannot make the second request.');
            throw new Error('BearerToken not available. Cannot make the second request.');
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