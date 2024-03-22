// Import necessary modules
import axios from 'axios'; // Library for making HTTP requests
import { wrapper } from 'axios-cookiejar-support';
import readlineSync from 'readline-sync';
import { CookieJar } from 'tough-cookie'; // Cookie jar implementation

// Create a new cookie jar
const jar = new CookieJar();

// Create an Axios instance with the cookie jar wrapper
const client = wrapper(axios.create({ jar }));

// Global variable
let cookie = null;
let password = null; // User password for authentication

// Function to send a POST request to a specified URL with provided data
const getResponse = async (url, data = {}) => {
    // Prepare request parameter using URLSearchParams for constructing the request body
    const params = new URLSearchParams();
    // Add username and password to the request body
    params.append('login_user', data['login_user']);
    params.append('login_passwd', data['login_passwd']);
    
    // Send request and return the response
    return client.post(url, params);
};

// Function to prompt the user for password input and store it
const getPassword = () => {
    // Use readlineSync to prompt for password input and mask it with 'X'
    password = readlineSync.question('Enter your password for user Sumu1231: ', {
        hideEchoBack: true,
        mask: 'X'
    });
};

// Prompt user for password input
getPassword();

// Authenticate user and obtain session cookie
getResponse('https://sumukhi.webchartnow.com/webchart.cgi', { 'login_user': 'Sumu1231', 'login_passwd': password })
    .then(response => {
        // Handle authentication response
        if (response && response.status === 200) {
            console.log('Authentication successful.');
        } else {
            console.log('Authentication failed. Please check your password.');
            throw new Error('Authentication failed');
        }
    })
    .then(() => {
        // const cookies = jar.getCookiesSync('https://sumukhi.webchartnow.com');
        // cookie = cookies.find(c => c.key === 'wc_miehr_sumukhi_session_id').value;
        // Print the cookie jar
        console.log('Cookie jar:', jar.getCookiesSync('https://sumukhi.webchartnow.com'));

        // Make subsequent requests using the cookie jar
        console.log('Subsequent requests using cookie jar:');
        // Example: Make a second request
        return client.post('https://sumukhi.webchartnow.com/webchart.cgi');
    })
    .then(response => {
        // Handle the response of the second request
        console.log("second request successful");
        //console.log('Second request response:', response.data);
    })
    .catch(error => {
        // Handle errors
        console.error('Error:', error);
    });
