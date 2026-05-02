import {FaEye, FaPen} from "react-icons/fa";
import {FaRegTrashCan} from "react-icons/fa6";
import {useEffect, useState} from "react";
import httpClient from "../api/httpClient.ts";
import {useNavigate} from "react-router-dom";
import Swal from "sweetalert2"
import * as DateHandler from "../util/dateHandler.ts";

interface data {
    _id: number;
    publishDate: Date;
    title: string;
    description: string;
}

const MyArticle = (): JSX.Element => {

    const [dataArray, setDataArray] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        handleGetMyArticles();
    }, []);

    const handleGetMyArticles = () => {

        httpClient.get('http://localhost:8080/article/get/my?size=10&page=1')
            .then(response => {

                setDataArray(response.data.data);

            })
            .catch(() => {
                Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                });

            });
    }

    const handleDeleteArticle = (e: data) => {


        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure do you to delete this article !",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                const id = e._id;
                httpClient.delete(`http://localhost:8080/article/${id}`)
                    .then(() => {
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        handleGetMyArticles();
                    })
                    .catch(() => {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Something went wrong',
                            icon: 'error',
                            confirmButtonText: 'Cool'
                        })
                    });

            }
        });
    }

    return (
        <section className={'p-10'}>
            <div>
                {
                    dataArray.length === 0 ?
                        <div className={'w-full h-[46vh] flex justify-center items-center'}>
                            <h1 className={'text-2xl text-center px-[100px] py-[50px] bg-green-50'}>Opss Record not found !</h1>
                        </div>
                         :


                    <table className={'w-full'}>

                        <thead className={'bg-gray-100'}>
                        <tr>
                            <th className={'py-4'}>Date</th>
                            <th className={'py-4'}>Title</th>
                            <th className={'py-4'}>Content</th>
                            <th className={'py-4'}>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {
                                dataArray.map((value: data) => {

                                    return <tr className={'w-full border-b-[1px] border-gray-300'}>
                                        <td className={'w-[10%] text-center'}>{DateHandler.formatDate(value.publishDate)}</td>
                                        <td className={'w-[20%] text-center'}>{value.title}</td>
                                        <td className={'w-[40%] text-start py-[10px]'} dangerouslySetInnerHTML={{__html:value.description}}></td>
                                        <td className={'w-[20%] text-center'}>
                                            <button
                                                onClick={() => navigate('/article', {state: {title: value.title, description: value.description}})}
                                                className={'bg-blue-500 text-white p-3 rounded-full mx-1'}><FaEye/>
                                            </button>
                                            <button
                                                onClick={() => navigate('/editor', {state: {article: value}})}
                                                className={'bg-green-600 text-white p-3 rounded-full mx-1'}><FaPen/>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteArticle(value)}
                                                className={'bg-red-500 text-white p-3 rounded-full mx-1'}>
                                                <FaRegTrashCan/>
                                            </button>
                                        </td>
                                    </tr>
                                })
                        }
                        </tbody>

                    </table>
                }
            </div>
        </section>
    );
}
export default MyArticle;