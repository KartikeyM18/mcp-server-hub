
export default function ErrorFallback({ error }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
      <h2 className="text-2xl font-bold text-red-500">Oops! Something went wrong.</h2>
      <p className="mt-4">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-white text-black rounded hover:bg-gray-300 transition"
      >
        Reload
      </button>
    </div>
  );
}
