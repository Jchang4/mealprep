import axios from 'axios';
import { SERVER_URL } from '../config';


function callAPI(props) {
  return axios({
    method: props.method,
    url: SERVER_URL + props.url,
    data: props.data || {},
  })
  .then(res => res.data);
}

export default callAPI;
