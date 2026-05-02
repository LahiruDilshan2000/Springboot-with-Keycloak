import React from "react";

class Footer extends React.Component<any, any>{

    render() {
        return(
            <footer className={"bg-teal-950 text-white p-5"}>
                <img src={'http://logodix.com/logo/1597040.png'} className={'w-[40px]' }/>
                <ul className={"mt-5"}>
                    <li>123D, Flower Road, Colombo</li>
                    <li>+94 76 722 3888</li>
                    <li>+94 77 722 7478</li>
                    <li>info@gmail.com</li>
                </ul>
                <div className={"mt-5 text-center"}>Copyright © 2023 urLd.</div>
            </footer>
        );
    }
}

export default Footer;