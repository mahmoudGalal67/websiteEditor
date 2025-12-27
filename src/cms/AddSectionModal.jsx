export default function AddSectionModal({ onSelect, onClose }) {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-64 p-4 space-y-2">
                <h3 className="font-semibold text-lg mb-2">Add Section</h3>

                <button
                    onClick={() => onSelect("hero")}
                    className="w-full p-2 border rounded hover:bg-gray-100"
                >
                    Hero Section
                </button>

                <button
                    onClick={() => onSelect("text")}
                    className="w-full p-2 border rounded hover:bg-gray-100"
                >
                    Text Section
                </button>

                <button
                    onClick={onClose}
                    className="w-full text-sm text-gray-500 mt-2"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
