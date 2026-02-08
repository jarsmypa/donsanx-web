import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-orange-500 selection:text-white">
            <div className="mx-auto max-w-md min-h-screen relative pb-20">
                {children}
            </div>
        </div>
    );
};

export default Layout;
