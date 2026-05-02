import {Link} from "react-router-dom";
import Input from "../components/input/input.tsx";
import {useState} from "react";
import * as validator from "../util/validator.ts"
import httpClient from "../api/httpClient.ts";
import Swal from "sweetalert2"
import header from "../components/layout/header.tsx";
import {data} from "autoprefixer";

function Signup(): JSX.Element {

    const [firstname, setFirstname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [lastname, setLastname] = useState('');
    const [errorMsg, setErrorMsg] = useState('');


    const handleInput = (e: any, type: string): void => {

        switch (type) {
            case "Username":
                setUsername(e.target.value);
                break;
            case "Email":
                setEmail(e.target.value);
                break;
            case "Firstname":
                setFirstname(e.target.value);
                break;
            case "Lastname":
                setLastname(e.target.value);
                break;
            case "Password":
                setPassword(e.target.value);
                break;
        }
    }


    const validateSubmission = () => {

        let isValidInput: boolean = true;
        let errorMsg: string = '';
        setErrorMsg(errorMsg);


        if (!validator.validateUsername(username)) {
            isValidInput = false;
            errorMsg = " > Invalid Username";
        }
        if (!validator.validateEmail(email)) {
            isValidInput = false;
            errorMsg = errorMsg + " > Invalid Email";
        }
        if (!validator.validateUsername(firstname)) {
            isValidInput = false;
            errorMsg = errorMsg +  " > Invalid Firstname";
        }
        if (!validator.validateUsername(lastname)) {
            isValidInput = false;
            errorMsg = errorMsg +  " > Invalid Lastname";
        }
        if (!validator.validatePassword(password)) {
            isValidInput = false;
            errorMsg = errorMsg + " > Invalid Password";
        }
        if (isValidInput) {

            setErrorMsg('');
            submitNewUser();

        } else {

            //this.setState({...this.state, errorMsg: errorMsg});
            setErrorMsg(errorMsg);
        }

    }

    const submitNewUser = () => {

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        let data = JSON.stringify({
            username:username,
            fname:firstname,
            lname:lastname,
            email:email,
            password:password
        })


        httpClient.post('http://localhost:8080/user', data, config )
            .then(res => {
                Swal.fire({
                    title: "Good job!",
                    text: "You clicked the button!",
                    icon: "success"
                });
            })
            .catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err,
                    icon: 'error',
                    confirmButtonText: 'Cool'
                })
            });
    }
    return (
        <section className={'flex justify-center items-center'}>
            <div
                className={'flex flex-col items-center justify-center w-[450px] h-[600px] border-[1px] border-gray-200 m-5 px-10'}>

                <img src={'http://logodix.com/logo/1597040.png'} title={'logo'} alt={'logo'}
                     className={'w-[100px]'}/>

                <Input
                    type={'text'}
                    name={'Username'}
                    label={'User name'}
                    placeholder={'User name'}
                    optional={false}
                    callBack={handleInput}/>

                <Input
                    type={'email'}
                    name={'Email'}
                    label={'Email'}
                    placeholder={'email'}
                    optional={false}
                    callBack={handleInput}/>

                <div className={'w-full flex'}>
                    <Input
                        type={'text'}
                        name={'Firstname'}
                        label={'First name'}
                        placeholder={'First name'}
                        optional={false}
                        callBack={handleInput}/>

                    <Input
                        type={'text'}
                        name={'Lastname'}
                        label={'Last name'}
                        placeholder={'Last name'}
                        optional={false}
                        callBack={handleInput}/>
                </div>

                <Input
                    type={'password'}
                    name={'Password'}
                    label={'Password'}
                    placeholder={'password'}
                    optional={false}
                    callBack={handleInput}/>

                {
                    errorMsg &&

                   /* <div>
                        {/!*Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });*!/}
                    </div>*/
                    <div className={'bg-red-100 text-center text-gray-500 p-2 m-4 w-full'}>{errorMsg}</div>

                }

                <button
                    onClick={validateSubmission}
                    type={'button'} className={"main-btn my-2"}>Sign in
                </button>

                <div className={'text-gray-400 '}>or</div>
                <div className={'text-gray-400 text-[14px]'}>Do you have an account ?
                    <span className={'text-blue-700 underline'}><Link to={'/login'}> Log in here </Link></span></div>

            </div>
        </section>
    );
}

export default Signup;