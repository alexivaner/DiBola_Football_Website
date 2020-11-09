const base_uri = "https://api.football-data.org/v2";
const api_key = "6fe42109b978474d98bae41b5b829796"
const loader = document.querySelector('#loading')
const body = document.querySelector('#body-content')

const fetchAPI = url => {
  return fetch(url, {
      headers: {
        'X-Auth-Token': api_key
      }
    })
    .then(res => {
      if (res.status !== 200) {
        console.log("Error: " + res.status);
        return Promise.reject(new Error(res.statusText))
      } else {
        return Promise.resolve(res)
      }
    })
    .then(res => res.json())
    .catch(err => {
      console.log(err)
    })
};
