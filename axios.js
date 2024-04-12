// Import necessary modules
import axios from 'axios'; // Library for making HTTP requests
import readlineSync from 'readline-sync'; // Library for synchronous readline

// Global variables
let cookie = null; // Cookie for session management
const apiUrl = 'https://sumukhi.webchartnow.com/webchart.cgi'; // API URL

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
    password = readlineSync.question('Enter your password for user Sumu1231: ', {
        hideEchoBack: true,
        mask: 'X'
    });
};

/**
 * Main function to authenticate user and make subsequent requests
 */
const main = async () => {
    
    try {

        // Prompt user for password input
        const password = getPassword();
        // Authenticate user and obtain session cookie
        const authResponse = await getResponse({ 'login_user': 'Sumu1231', 'login_passwd': password });
        
        // Check if authentication was successful
        if (authResponse && authResponse.status === 200) {
            console.log('Authentication successful.');
            if (authResponse.headers['set-cookie']) {
                cookie = authResponse.headers['set-cookie'][0].split('=')[1].split(';')[0];
            } else {
                console.log('Set-cookie header not found or empty.');
            }
        } else {
            console.log('Authentication failed. Please check your password.');
            return;
        }

        // Make another request using the obtained cookie
        if (cookie) {
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
            console.log('Cookie not available. Cannot make the second request.');
        }
    } catch (error) {
        // Handle errors
        console.error('Error during authentication or second request: ', error);
    }
};

// Call the main function to start the authentication process
main();
