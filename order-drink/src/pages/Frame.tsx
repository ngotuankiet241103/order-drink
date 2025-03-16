import React from 'react';
import Sidebar from '../components/Sidebar';

const Frame = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className=" flex justify-center p-4">
               <div className='w-[1200px]'>
                     {children}
               </div>
            </div>
        </div>
    );
};

export default Frame;