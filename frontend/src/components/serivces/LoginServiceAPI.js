import axios from 'axios';

export default class LoginServiceAPI {

    static login(email, password){
        console.log(email, password);
        return axios.post('http://localhost:3001/login').then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

}