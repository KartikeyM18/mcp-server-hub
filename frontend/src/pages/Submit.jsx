
import SubmitForm from '../components/SubmitForm';

const Submit = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl p-8 bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Submit a New Server
        </h1>
        <SubmitForm />
      </div>
    </div>
  );
};

export default Submit;


