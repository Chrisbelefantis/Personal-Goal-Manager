import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://ec2-35-178-67-80.eu-west-2.compute.amazonaws.com:3000/'
    // baseURL: 'http://localhost:3001/'
});



export default instance;