import axios from "axios";
const url = "http://localhost:5050/";

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

      getPlants() {
        return this.authenticatedCall("get", `${url}get`);
      }
    
      addPlant(name) {
        console.log(name);
        return this.authenticatedCall("put", `${url}add`, {"name": name});
      }
    
      deletePlant(id) {
        return this.authenticatedCall("put", `${url}delete/${id}`);
      }
    
      waterPlant(id) {
        return this.authenticatedCall("put", `${url}water/${id}`);
      }
    
      async login(username, password) {
        return await axios({
          method: "post",
          url: `${url}auth`,
          data: { username, password },
        });
      }
}