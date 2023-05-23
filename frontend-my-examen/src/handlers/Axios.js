import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:9000';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; //sets cookie inside browser