import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNocmlzQHlhaG9vLmdyIiwidXNlcklkIjoiNWY2OWVhMTlmZjQzNDMzNWIwZjkwMjE3IiwiaWF0IjoxNjAwNzc2NzQxLCJleHAiOjE2MDA3ODAzNDF9.bE0vw8rJxtGOhf3hPHB8v_ko65YHLnSIWHHsTkys_CY'}
});



export default instance;