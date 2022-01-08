export default class AuthService {
    userIsLogged() {
        return localStorage.getItem('user') !== null;
    }

    logout = () => {
        localStorage.removeItem('user');
    }
}