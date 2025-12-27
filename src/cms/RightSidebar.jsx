import { useCMS } from "./store";

export default function RightSidebar() {
    const { selectedSection, updateProp } = useCMS();

    if (!selectedSection) {
        return (
            <aside className="w-72 bg-gray-100 p-4">
                <p className="text-gray-500">Select a section</p>
            </aside>
        );
    }

    return (
        <aside className="w-72 bg-gray-100 p-4 space-y-3">
            <h2 className="font-bold text-lg">Section Settings</h2>

            {Object.entries(selectedSection.props).map(([key, value]) => (
                <div key={key}>
                    <label className="text-sm font-medium capitalize">{key}</label>

                    {key === "bg" ? (
                        <input
                            type="color"
                            value={value}
                            onChange={e =>
                                updateProp(selectedSection.id, key, e.target.value)
                            }
                            className="w-full h-8"
                        />
                    ) : (
                        <input
                            className="w-full border p-2 rounded"
                            value={value}
                            onChange={e =>
                                updateProp(selectedSection.id, key, e.target.value)
                            }
                        />
                    )}
                </div>
            ))}
        </aside>
    );
}
