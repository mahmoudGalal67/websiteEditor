import { Outlet } from "react-router-dom";
import RightSidebar from "../../cms/RightSidebar";
import { useCMS } from "../../cms/store";

function UndoRedoToolbar() {
  const { undo, redo } = useCMS();

  return (
    <div className="flex gap-2 mb-4">
      <button onClick={undo} className="px-3 py-1 bg-gray-200 rounded">
        Undo
      </button>
      <button onClick={redo} className="px-3 py-1 bg-gray-200 rounded">
        Redo
      </button>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* LEFT SIDEBAR */}

      {/* MAIN CONTENT */}
      <UndoRedoToolbar />
      <main className="flex-1 flex flex-col p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>

      {/* RIGHT SIDEBAR */}
      <RightSidebar />
    </div>
  );
}
