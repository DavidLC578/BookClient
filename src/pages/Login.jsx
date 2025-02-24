import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import InputCustom from "../components/InputCustom";

function Login() {

    const navigate = useNavigate();
    const { signin, isAuthenticated } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (value) => {
        await signin(value);
    };
    useEffect(() => {
        if (isAuthenticated) navigate("/home");
    }, [isAuthenticated]);
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-white text-2xl font-bold text-center mb-6">Sign in</h2>
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <InputCustom label="Username" name="name" register={register} />
                    <InputCustom label="Password" name="password" register={register} type="password" />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition cursor-pointer"
                    >
                        Sign in
                    </button>
                    <p>
                        <Link to="/register">You don't have an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login