import React from 'react';
import { NavLink } from 'react-router-dom';


const Sidebar: React.FC = () => {
    return (
        <div className="sidebar-container bg-gray-800 text-white h-full">
            <div className="sidebar-menu p-4">
                <ul className="space-y-4">
                    <li>
                        <NavLink 
                            to="/" 
                            className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded block" : "hover:bg-gray-700 p-2 rounded block"}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/users" 
                            className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded block" : "hover:bg-gray-700 p-2 rounded block"}
                        >
                            Users
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/orders" 
                            className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded block" : "hover:bg-gray-700 p-2 rounded block"}
                        >
                            Orders
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/stores" 
                            className={({ isActive }) => isActive ? "bg-gray-700 p-2 rounded block" : "hover:bg-gray-700 p-2 rounded block"}
                        >
                            Stores
                        </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;