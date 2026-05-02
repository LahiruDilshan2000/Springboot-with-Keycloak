import React from "react";
import {Link} from "react-router-dom";

class Header extends React.Component<any, any>{

    render() {
        return(
            <header>
                <nav className={"flex justify-center items-center bg-green-100 pt-5 relative"}>
                    <img src={'http://logodix.com/logo/1597040.png'} className={'w-[40px] absolute left-2 top-0 bottom-0 m-auto' }/>
                    <ul className={"flex gap-[4vw]"}>
                        <li className={'hover:text-green-700 text-gray-500 hover:border-b-2 border-green-600 pb-4'}><Link to={'/'}>Articles</Link></li>
                        <li className={'hover:text-green-700 text-gray-500 hover:border-b-2 border-green-600 pb-4'}><Link to={"/my-article"}>My Articles</Link></li>
                        <li className={'hover:text-green-700 text-gray-500 hover:border-b-2 border-green-600 pb-4'}><Link to={"/editor"}>Write New Articles</Link></li>
                        <li className={'hover:text-green-700 text-gray-500 hover:border-b-2 border-green-600 pb-4'}><Link to={"/login"}>Create An Account / Login</Link></li>
                        <li className={'hover:text-green-700 text-gray-500 hover:border-b-2 border-green-600 pb-4'}><Link to={"/logout"}>Logout</Link></li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;
