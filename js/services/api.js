class Axios {
    constructor() {
        this.api = 'https://65478803902874dff3ac6d30.mockapi.io/api/ec6';
        this.userEndPoint = '/users'
    }
    getUsers() {
        return axios.get(this.api + this.userEndPoint);
    }
    postUser(userInfo) {
        return axios.post(this.api + this.userEndPoint, userInfo);
    }
    getUser(userInfo) {
        return axios.get(this.api + this.userEndPoint + "/" + userInfo.id);
    }
    putUser(userInfo) {
        return axios.put(this.api + this.userEndPoint + "/" + userInfo.id, userInfo);
    }
    deleteUser(userInfo) {
        return axios.delete(this.api + this.userEndPoint + "/" + userInfo.id);
    }

}

const axiosInstance = new Axios();
export default axiosInstance;