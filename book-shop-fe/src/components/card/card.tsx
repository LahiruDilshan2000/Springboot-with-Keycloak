import {useNavigate} from "react-router-dom";

interface Props {
    title?: string;
    content?: string;
}

interface States {

}

function Card(props: Props): JSX.Element {

    const navigate = useNavigate();
    /*constructor(props: Props) {
        super(props);
        this.state = {count: 0}
        console.log("constructor");
    }*/

    /*static getDerivedStateFromProps(props:Props, state:States){
        console.log("getDerivedStateFromProps");
        return null;
    }*/


    /*componentDidMount(): void {
        console.log("componentDidMount");
    }*/

    /*shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<States>, nextContext: any): boolean {
        console.log("shouldComponentUpdate");
        return true;
    }*/

    /*getSnapshotBeforeUpdate(prevProps: Readonly<Props>, prevState: Readonly<States>): any {
        console.log("getSnapshotBeforeUpdate");
        return null;
    }*/
    /*componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<States>, snapshot?: any) {
        console.log("componentDidUpdate");
    }*/
    /*componentWillUnmount():void {
        console.log("componentWillUnmount");
    }*/


    return (
        <div className={"w-72 p-5 border-solid border-2 m-5"}>
            <h1 className={"text-2xl font-bold"}>{props.title}</h1>
            <p className={"my-5"} >{props.content}</p>
            <button className={"bg-green-600 p-2 text-white"} onClick={() => navigate('/article', {state: {title: props.title, description: props.content}})}>Read More...</button>

             {/*-1 is back*/}
            {/*<button className={"bg-green-600 p-2 text-white"} onClick={() => navigate(-1)}>Read More...</button>*/}
        </div>
    );
}

export default Card;