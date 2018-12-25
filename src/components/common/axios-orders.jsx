import axios from 'axios';

const instance = axios.create ({
    baseURL: 'https://supply-b6f48.firebaseio.com/'
});

export default instance;