class User {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    };
};

class Login {
    constructor(form, fields) {
        this.form = form;
        this.fields = fields;
        this.validateOnSubmit();
    };

    validateOnSubmit() {
        const self = this;

        this.form.addEventListener('submit', function(e) {
            e.preventDefault();

            let error = 0;

            self.fields.forEach(function(field) {
                if(self.validateFields(field) == false) {
                    error++;
                }
            });
            if(error == 0) {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                // DO LOGIN API HERE
                const user = new User(username, password);

                localStorage.setItem('auth', JSON.stringify(user));

                // submit
                self.form.submit();
            };
        });
    };

    validateFields(field) {
        const input = document.getElementById(field);

        if(!input.value.trim()) {
            this.setStatus(
                input,
                `${input.placeholder} cannot be empty`,
                'error'
            );
            return false;
        } else {
            if(input.type == 'password') {
                if(input.value.length < 8) {
                    this.setStatus(
                        input,
                        `${input.placeholder} must be at least 8 characters`,
                        'error'
                    );
                    return false;
                } else {
                    this.setStatus(
                        input,
                        '',
                        'success'
                    );
                };
            } else {
                this.setStatus(
                    input,
                    '',
                    'success'
                );
            };
        };
    };

    setStatus(field, message, status) {
        if(status === 'error') {
            field.classList.add('input-error');
            const errorMessage = field.parentElement.parentElement.querySelector('.error-message');
            errorMessage.textContent = message;
        };
        if(status === 'success') {
            field.classList.remove('input-error');
            const errorMessage = field.parentElement.parentElement.querySelector('.error-message');
            errorMessage.textContent = message;
        };
    };
};


const form = document.querySelector('.login-form');
if(form) {
    const fields = ['username', 'password'];
    const validator = new Login(form, fields);
};

const passwordBtn = document.querySelector('.password-btn');
const input = passwordBtn.previousElementSibling;

passwordBtn.addEventListener('click', function(e) {
    
    const type = input.getAttribute('type');

    input.setAttribute(
        'type', type === 'password' ? 'text' : 'password'
    );

    passwordBtn.classList.toggle('toggle-password');

});

// Authentication

class UI {
    static validateLoginHistory() {
        document.querySelector('body').style.display = 'none';

        const newUser = localStorage.getItem('newUser') ? true : false;
        const users = localStorage.getItem('users') ? true : false;

        let error = 0;

        if(newUser) {
            error++;
            window.location.replace('./welcome.html');
        };


        if(error == 0) {
            if(users) {
                const users = JSON.parse(localStorage.getItem('users'));

                users.forEach(function(exist) {
                    UI.validateUser(exist);
                });
            }else {
                document.querySelector('body').style.display = 'block';
            };
        } ;
    };

    static validateUser(exist) {
        const user = JSON.parse(localStorage.getItem('auth'));
        if(!user) {
            document.querySelector('body').style.display = 'block';
        } else {
            let errorLoop = 0;
            if(user.username === exist.username && user.password === exist.password) {
                errorLoop++;
            };

            if(errorLoop == 1) {
                window.location.replace('./welcome.html');
            } else {
                document.querySelector('body').style.display = 'block';
            };
        };
    };

};