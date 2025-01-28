import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
    <nav className="bg-gray-800 text-white py-4 px-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">
            <Link to="/">Movie<span className="text-blue-500">Hub</span></Link>
        </h1>
        <div className="space-x-4">
            <Link to="/" className="hover:text-blue-500">Home</Link>
        </div>
    </nav>
);

export default Navbar;
