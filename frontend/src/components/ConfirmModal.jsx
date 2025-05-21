const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 transition-all">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">{message}</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-200 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-zinc-600 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
