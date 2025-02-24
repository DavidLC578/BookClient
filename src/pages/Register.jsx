import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import InputCustom from "../components/InputCustom";
function Register() {

    const navigate = useNavigate();
    const { signup, isAuthenticated } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (value) => {
        await signup(value);
    };
    useEffect(() => {
        if (isAuthenticated) navigate("/home");
    }, [isAuthenticated]);
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-neutral-900 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-white text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit(onSubmit)}>
                    <InputCustom label="Username" name="name" register={register} />
                    <InputCustom label="Email" name="email" register={register} type="email" />
                    <InputCustom label="Password" name="password" register={register} type="password" />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition cursor-pointer"
                    >
                        Sign up
                    </button>
                    <p>
                        <Link to="/login">You have an account</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Register