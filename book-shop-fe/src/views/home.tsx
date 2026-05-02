import {useEffect, useState} from "react";
import Card from "../components/card/card";
import httpClient from "../api/httpClient.ts";


interface Data {
    id: number;
    date: string;
    title: string;
    description: string;
}

function Home(): JSX.Element {

    const [data, setData] = useState<Data[]>([]);

    const fetchData = (): void => {

        /*using fetch*/

        /*fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(result => {
                this.setState({data: result})
            }).catch(err => {
            console.log(err)
        });*/

        /*using axios*/

        httpClient.get('http://localhost:8080/article?size=100&page=1')
            .then(response => {

                setData(response.data.data);
                console.log(response.data.data);

            })
            .catch(err => {

                console.log(err);

            });
    }

    useEffect(() => {

        fetchData();
        console.log('hello');

    }, []);

    return (
        <section>

            <div
                className={"grid 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 w-fit relative m-auto"}>
                {
                    data.map((value: Data) => {
                        return <Card title={value.title} content={value.description}/>
                    })
                }
            </div>
        </section>
    );

}

export default Home;