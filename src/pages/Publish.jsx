import { useForm } from "react-hook-form";
import Header from "../components/Header";
import InputCustom from "../components/InputCustom";
import { publish } from "../api/booksApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Publish() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const [message, setMessage] = useState();
    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('synopsis', data.synopsis);
        formData.append('category', data.category);

        formData.append('file', data.file[0]);
        formData.append('image', data.image[0]);

        try {
            const res = await publish(formData);
            if (res.status === 201) {
                setMessage(res.data.message);
                setTimeout(() => {
                    navigate('/home');
                }, 3000);
            }
        } catch (error) {
            console.error(error.response.data.message)
        }
    }
    return (
        <>
            <Header />
            <div className="flex items-center justify-center mt-14 ">
                <div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-96">
                    <h1 className="text-white text-2xl font-bold text-center mb-6">Publish a eBook</h1>
                    <form className="flex flex-col space-y-5" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
                        <InputCustom label="Title" name="title" register={register} />
                        <InputCustom label="Synopsis" name="synopsis" register={register} />
                        <InputCustom label="Category" name="category" register={register} />
                        <InputCustom label="File (pdf)" name="file" register={register} type="file" />
                        <InputCustom label="Image" name="image" register={register} type="file" />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition cursor-pointer"
                        >
                            Publish
                        </button>
                        {message && <p>{message}</p>}
                    </form>
                </div>
            </div >

        </>

    );
}
export default Publish;