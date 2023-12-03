import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-51-20-79-70.eu-north-1.compute.amazonaws.com:3001/'
    // baseURL: 'http://localhost:3001/'
});



export default instance;
