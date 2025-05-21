export default function AuthInput({ label, type, name, value, onChange, placeholder }) {
  return (
    <div className="mb-5">
      <label
        className="block text-white font-semibold mb-2 select-none"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
        className="
          w-full px-4 py-3
          bg-gray-800 text-white
          border border-gray-700 rounded-md
          placeholder-gray-400
          transition
          duration-300
          focus:outline-none
          focus:ring-2 focus:ring-blue-500
          focus:border-blue-500
          shadow-sm
          hover:shadow-md
        "
        autoComplete="off"
      />
    </div>
  );
}

  