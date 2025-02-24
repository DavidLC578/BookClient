
function InputCustom({ label, type = "text", name, register }) {
    return (
        <div className="flex flex-col">
            <label className="text-gray-300 mb-1 font-semibold" htmlFor={name}>
                {label}
            </label>
            <input
                type={type}
                name={name}
                className="bg-neutral-700 font-semibold text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(name)}
            />
        </div>
    )
}
export default InputCustom;