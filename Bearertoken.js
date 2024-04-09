// Import necessary modules
import axios from 'axios'; // Library for making HTTP requests
import { get } from 'https';
import readlineSync from 'readline-sync'; // Library for synchronous readline

// Global variables
let bearerToken = null; // Bearer token for authentication
let password = process.argv[3];
const apiUrl = 'https://sumukhi.webch.art/webchart.cgi'; // API URL
const username = process.argv[2];

/**
 * Function to send a POST request to obtain bearer token
 * @param {Object} data - Data to be sent in the request body
 * @param {Object} headers - Optional headers to be sent with the request
 * @returns {Promise} - Promise representing the HTTP response
 */
const getResponse = async (data = {}, headers = {}) => {
    // Prepare request parameter using URLSearchParams for constructing the request body
    const params = new URLSearchParams();
    // Add username and password to the request body if bearerToken is not available
    if (!bearerToken) {
        params.append('login_user', data['login_user']); // Add username
        params.append('login_passwd', data['login_passwd']); // Add password
    }

    // Set headers if provided
    if (Object.keys(headers).length === 0 && headers.constructor === Object) {
        headers['Authorization'] = `Bearer ${bearerToken}`;
    }

    let options = {
        headers: headers,
        method: "POST",
        data: params
    };

    return axios(apiUrl, options);
};

// Authenticate user and obtain bearer token
getResponse({ 'login_user': username, 'login_passwd': password })
    .then(response => {
        // Check if authentication was successful
        if (response && response.status === 200) {
            console.log('Authentication successful.');
            if (response.headers['set-cookie']) {
                bearerToken = response.headers['set-cookie'][0].split('=')[1].split(';')[0];
                //console.log('BearerToken:', bearerToken);
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
            //console.log('Attempting second request using bearerToken:', bearerToken);
            return getResponse();
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
