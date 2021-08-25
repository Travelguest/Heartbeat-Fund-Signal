import axios from 'axios';

const baseUrl = '/';

function axiosFetch(url, data) {
  return axios({
    url: baseUrl + url,
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    data,
  })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
}

export const fetchxxxx = (params) => axiosFetch('xxxx', params);
export const fetchxxxxy = (params) => axiosFetch('xxxx', params);
