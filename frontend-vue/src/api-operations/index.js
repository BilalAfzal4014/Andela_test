import axios from 'axios';


const api = function (type, url, data = {}, headers = {}) {
    return axios[type](
      url,
      data,
      headers,
    ).then((response) => (response.data))
      .catch((error) => {
        if(error.message){
          alert(error.message)
        } /*else {
          return error[0].response;
        }*/
        return Promise.reject(error[0] ? error[0].response : error);
      });
};

export default api;
