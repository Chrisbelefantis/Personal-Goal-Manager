import axios from 'axios';

const instance = axios.create({
    baseURL: 'ec2-18-130-225-215.eu-west-2.compute.amazonaws.com:3001/'
    // baseURL: 'http://localhost:3001/'
});



export default instance;
