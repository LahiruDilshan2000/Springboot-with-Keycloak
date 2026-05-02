import {useLocation} from "react-router-dom";

function Article(): JSX.Element{

    const location = useLocation();
    const title:any = location.state.title;
    const description = location.state.description;

    return (
        <section className={'my-5 mx-5 min-h-[80vh]'}>
            {/*title*/}
            <div className={'text-4xl font-bold text-center'}>{title}</div>

            {/*content*/}
            <div className={'mt-5 no-more-tailwind'}>
                <div dangerouslySetInnerHTML={{__html:description}}></div>
            </div>
        </section>
    );
}
export default Article;