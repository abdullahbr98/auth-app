class AccountClass{
    #emailAddress;
    #password;

    constructor(emailAddress,password){
        this.emailAddress = emailAddress;
        this.password = password;
    }

    set setEmail(email){
        this.emailAddress = email;
    }

    set setPassword(password){  
        this.password = password;
    }
}



export default AccountClass;