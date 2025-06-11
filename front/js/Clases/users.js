let userId = 1;

class User{
    /**
     * 
     * @param {str} name 
     * @param {str} email 
     * @param {str} password 
     */
    constructor(name,email,password){
        this.id = userId;
        userId++;
        this.name = name;
        this.email=email;
        this.password = password;
        this.record = 0
    }
}

const users = [];
users.push(new User ("J", "a@pio", "123"));
console.log(users)