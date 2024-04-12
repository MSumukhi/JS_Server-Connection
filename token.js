// Import necessary modules
import axios from 'axios'; // Library for making HTTP requests
import readlineSync from 'readline-sync'; // Library for synchronous readline

// Global variables
let bearerToken = null; // Bearer token for authentication
const apiUrl = 'https://sumukhi.webch.art/webchart.cgi'; // API URL
const username = process.argv[2];

// Function to send a POST request to obtain bearer token
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

// Function to prompt the user for password input and store it
const getPassword = () => {
    // Use readlineSync to prompt for password input and mask it with 'X'
    return readlineSync.question('Enter your password for user ' + username + ': ', {
        hideEchoBack: true,
        mask: 'X'
    });
};

// Main function to authenticate user and make subsequent requests
const main = async () => {
    try {

        const password = getPassword();
        // Authenticate user and obtain bearer token
        const response = await getResponse({ 'login_user': username, 'login_passwd': password });
        
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
            return; // Exit function if authentication fails
        }

        // Make another request using the obtained bearer token
        if (bearerToken) {
            //console.log('Attempting second request using bearerToken:', bearerToken);
            const secondResponse = await getResponse();
            // Handle the response of the second request
            if (secondResponse && secondResponse.status === 200) {
                console.log('Second request successful.');
                // Log the response after the second request
                //console.log('Response after second request:', secondResponse);
            } else {
                console.log('Second request failed.');
                // Handle failure
            }
        } else {
            console.log('BearerToken not available. Cannot make the second request.');
            return; // Exit function if bearerToken is not available
        }
    } catch (error) {
        // Handle errors
        console.error('Error during authentication or second request: ', error);
    }
};

// Execute main function
main();
