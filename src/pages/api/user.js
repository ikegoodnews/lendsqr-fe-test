import axios from 'axios';

export const client = axios.create({
   baseURL: 'https://run.mocky.io/v3/8140500f-f58d-49de-a3e5-798437cb162d',
   timeout: 5000,
   headers: {'X-Custom-Header': 'foobar'},
});
