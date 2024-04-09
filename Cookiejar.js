// Import necessary modules
import axios from 'axios'; // Library for making HTTP requests
import { wrapper } from 'axios-cookiejar-support';
import readlineSync from 'readline-sync';
import { CookieJar } from 'tough-cookie'; 

// Base URL
const apiUrl = 'https://sumukhi.webchartnow.com';

// Create a new cookie jar
const jar = new CookieJar();
const username = process.argv[2];

// Create an Axios instance with the cookie jar wrapper
const client = wrapper(axios.create({ jar }));

// Function to send a POST request to a specified URL with provided data
const getResponse = async (url, data = {}) => {
    const params = new URLSearchParams();
    params.append('login_user', data['login_user']);
    params.append('login_passwd', data['login_passwd']);
    return client.post(url, params);
};

// Function to prompt the user for password input
const getPassword = () => {
    return readlineSync.question('Enter your password for user ' + username + ': ', {
        hideEchoBack: true,
        mask: 'X'
    });
};

// Main function to authenticate user and make subsequent requests
const main = async () => {
    try {
        // Prompt user for password input
        const password = getPassword();
        
        // Authenticate user and obtain session cookie
        const response = await getResponse(`${apiUrl}/webchart.cgi`, { 'login_user': username, 'login_passwd': password });

        // Handle authentication response
        if (response && response.status === 200) {
            console.log('Authentication successful.');
        
            // Make subsequent requests using the cookie jar
            //console.log('Subsequent requests using cookie jar:');
            // Example: Make a second request
            const secondResponse = await client.post(`${apiUrl}/webchart.cgi`);
            console.log("Second request successful");
            // Handle the response of the second request
            // console.log('Second request response:', secondResponse.data);
        } else {
            console.log('Authentication failed. Please check your password.');
            throw new Error('Authentication failed');
        }
    } catch (error) {
        console.error('Error:', error);
    }
};

// Execute main function
main();
