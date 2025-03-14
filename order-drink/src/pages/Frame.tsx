import React from 'react';
import Sidebar from '../components/Sidebar';

const Frame = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-grow p-4">
                {children}
            </div>
        </div>
    );
};

export default Frame;