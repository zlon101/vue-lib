import axios from 'axios';

// example-code?addre=basecmp/icon
const getCode = addre => {
  return axios.get('/example-code', {
    params: {
      addre,
    },
  });
};

// update-code
const setCode = (addre, code) => {
  return axios({
    url: '/update-code',
    method: 'post',
    data: {
      addre,
      code,
    },
  });
};

export default {
  getCode,
  setCode,
};
