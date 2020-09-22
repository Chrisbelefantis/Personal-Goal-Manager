import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNocmlzQHlhaG9vLmdyIiwidXNlcklkIjoiNWY2OWVhMTlmZjQzNDMzNWIwZjkwMjE3IiwiaWF0IjoxNjAwNzgwNDUyLCJleHAiOjE2MDA3ODQwNTJ9.R5GplEzTHM3QMWgUMTSjpizeg4b4gcn8bSMZ7xIzKsY'}
});



export default instance;