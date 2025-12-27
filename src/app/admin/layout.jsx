import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import RightSidebar from "../../cms/RightSidebar";

import { useCMS } from "../../cms/store";

function UndoRedoToolbar() {
  const { undo, redo } = useCMS();
  return (
    <div className="flex gap-2 mb-4">
      <button onClick={undo} className="p-2 bg-gray-200 rounded">
        Undo
      </button>
      <button onClick={redo} className="p-2 bg-gray-200 rounded">
        Redo
      </button>
    </div>
  );
}

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <UndoRedoToolbar />
      <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
        <Outlet />
      </main>
      <RightSidebar />
    </div>
  );
}
