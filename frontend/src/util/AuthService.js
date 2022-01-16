export default class AuthService {
    userIsLogged() {
        console.log(localStorage);
        return localStorage.getItem('mySession') !== null;
    }

    logout = () => {
        localStorage.removeItem('mySession');
    }
}