const nameRegex = /^[A-Za-z0-9]{3,16}$/
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const mobileRegex = /^7|0|(?:\ +94)[0-9]{9,10}$/


export const validateUsername = (name:string):boolean => {
    console.log(name)
    console.log(nameRegex.test(name))
    return nameRegex.test(name);
}
 export const validateEmail = (email:string):boolean => {
     return emailRegex.test(email);
 }

export const validateMobile = (mobile:string):boolean => {
    return mobileRegex.test(mobile);
}

export const validatePassword = (password:string):boolean => {
    return password.length >= 8;
}