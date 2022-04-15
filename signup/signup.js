class User {
    constructor(firstName, lastName, username, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.username = username;
        this.password = password;
    };
};

class Store {
    static getUsers() {
        return localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];
    };
    static addUser(user) {
        const users = Store.getUsers();
        users.push(user);
        localStorage.setItem('users', JSON.stringify(users));
        const newUser = ['newUser'];
        localStorage.setItem('newUser', JSON.stringify(newUser));
    };
};

class Signup {
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
                };
            });

            if(error == 0) {
                const firstName = document.getElementById('firstName').value;
                const lastName = document.getElementById('lastName').value;
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;

                const user = new User(firstName, lastName, username, password);
                
                Store.addUser(user);
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
            if(input.id == 'username') {
                const users = Store.getUsers();
                const self = this;
                let stats = true;

                users.forEach(function(user) {
                    if(self.validateUsername(input, user) == false) {
                        stats = false;
                    };
                });

                return stats;
            };
        };
    };

    validateUsername(username, exist) {
        if(username.value == exist.username) {
            this.setStatus(
                username,
                `${username.placeholder} is already exist`,
                'error'
            );
            return false;
        };
    };

    setStatus(field, message, status) {
        if(status == 'error') {
            field.classList.add('input-error');
            const errorMessage = field.parentElement.parentElement.querySelector('.error-message');
            errorMessage.textContent = message;
        };
        if(status == 'success') {
            field.classList.remove('input-error');
            const errorMessage = field.parentElement.parentElement.querySelector('.error-message');
            errorMessage.textContent = message;
        };
    };

};

const form = document.querySelector('.signup-form');
if(form) {
    const fields = ['firstName', 'lastName', 'username', 'password'];
    const validator = new Signup(form, fields);

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