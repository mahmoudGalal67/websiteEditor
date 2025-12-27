import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import RightSidebar from "../../cms/RightSidebar";

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            <Sidebar />
            <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
                <Outlet />
            </main>
            <RightSidebar />
        </div>
    );
}
