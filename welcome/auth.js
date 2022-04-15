class Auth {
    constructor() {
        document.querySelector('body').style.display = 'none';
        this.validateAuth();
    };

    validateAuth() {
    const newUser = localStorage.getItem('newUser') ? true : false;
    const user = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : false;
    const users = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : false;
    let error = 0;

    if(newUser) {
        document.querySelector('body').style.display = 'block';
        error++;
    };

    if(!users) {
        window.location.replace('./index.html');
        error++;
    };

    if(error == 0) {
        let errorLoop = 0;
        users.forEach(function(exist) {
            if(user.username === exist.username && user.password === exist.password) {
                errorLoop++;
            };
        });
        
        if(errorLoop == 1) {
            document.querySelector('body').style.display = 'block';
        } else {
            window.location.replace('./index.html');
        };
        };
    };

    logOut() {
        localStorage.removeItem('newUser');
        localStorage.removeItem('auth');
        window.location.replace('./index.html');
    };
};