import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3001/',
    headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNocmlzQHlhaG9vLmNvbSIsInVzZXJJZCI6IjVmNmI1MGExOWUxZGU1MmUzY2Q3YTE3NyIsImlhdCI6MTYwMDg3MzUzNSwiZXhwIjoxNjAwODc3MTM1fQ.OS0BLJNxC9j4f1yzwry5cv3S6vbZSqxbhe3GmqLGyYU'}
});



export default instance;