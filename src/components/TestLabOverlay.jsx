import React from 'react';
import { Link } from 'react-router-dom';
import { FlaskConical } from 'lucide-react';

const TestLabOverlay = () => {
    return (
        <Link
            to="/buttons"
            className="fixed bottom-8 right-8 z-50 bg-black text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 font-medium border-2 border-white/20"
        >
            <FlaskConical size={24} />
            <span className="hidden md:inline">Test Lab</span>
        </Link>
    );
};

export default TestLabOverlay;
