import axios from "axios";
const url = "https://plant-pal-backend.onrender.com/";

export default class ApiClient {
    constructor(tokenProvider, logoutHandler) {
        this.tokenProvider = tokenProvider;
        this.logoutHandler = logoutHandler;
      }
    
      authenticatedCall(method, url, data) {
        return axios({
          method,
          url,
          headers: {
            authorization: this.tokenProvider(),
          },
          data,
        }).catch((error) => {
          if (error.response.status === 403) {
            this.logoutHandler();
            return Promise.reject();
          } else {
            throw error;
          }
        });
      }

      // somehow use login data.username
      getPlants(token) {
        return this.authenticatedCall("get", `${url}get/${token}`);
      }
    
      addPlant(name, token) {
        return this.authenticatedCall("put", `${url}add/${token}`, {"name": name});
      }
    
      deletePlant(id, token) {
        return this.authenticatedCall("put", `${url}delete/${token}/${id}`);
      }
    
      waterPlant(id, token) {
        return this.authenticatedCall("put", `${url}water/${token}/${id}`);
      }
    
      async login(username, password) {
        // return await axios({
        //   method: "post",
        //   url: `${url}auth`,
        //   data: { username, password },
        // });
      try {
        return await axios({
          method: "post",
          url: `${url}auth`,
          data: { username, password },
        });
      } catch(err) {
        console.log(err)
      }

      
      }
}