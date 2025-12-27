import { NavLink } from "react-router-dom";
import { Home, Palette, Share2 } from "lucide-react";

const Item = ({ to, icon: Icon, children }) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded ${isActive ? "bg-blue-600 text-white" : "hover:bg-[#2c3338]"}`
        }
    >
        <Icon size={16} /> {children}
    </NavLink>
);

export default function Sidebar() {
    return (
        <aside className="w-64 bg-[#1d2327] text-gray-200 p-3">
            <h1 className="text-lg font-bold px-4 py-3 border-b border-gray-700">My CMS</h1>
            <nav className="mt-4 space-y-1">
                <Item to="/admin/home" icon={Home}>Home Page</Item>
                <Item to="/admin/brand" icon={Palette}>Brand</Item>
                <Item to="/admin/socials" icon={Share2}>Socials</Item>
            </nav>
        </aside>
    );
}
