
export default function AuthInput({ label, type, name, value, onChange, placeholder }) {
    return (
      <div className="mb-4">
        <label className="block text-white font-medium mb-1" htmlFor={name}>
          {label}
        </label>
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 text-white border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
    );
  }
  