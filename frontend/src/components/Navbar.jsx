import React from 'react';
import { Link } from 'react-router-dom';
import { Airplay, Bell, MessageSquare, User } from 'lucide-react';

function Navbar() {
    const [ProfileOpen, setProfileOpen] = React.useState(false);
    return (
        <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg">
            <div className="container mx-auto px-4 h-16">
                <div className="flex items-center justify-between h-full">
                
                <div className="flex items-center gap-3 ml-12">
                    <Airplay className="w-6 h-6 text-primary" />
                    <span className="text-white text-base">NextGen-ERP</span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="btn btn-sm gap-2 rounded-md bg-primary/10 flex items-center px-3 py-2" onClick={() => setProfileOpen(!ProfileOpen)}>
                        <User className="w-5 h-5 text-primary" />
                        <span className="text-primary text-base">Logout</span>
                    </button>
                </div>
                </div>
            </div>
           
        </header>
    )
}

export default Navbar;
