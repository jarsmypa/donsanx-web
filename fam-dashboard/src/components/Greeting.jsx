import React from 'react';

const Greeting = ({ names, greeting = "Hola" }) => {
    const hour = new Date().getHours();
    let timeBasedGreeting = greeting;

    // Only verify time if generic "Hola" is passed, otherwise respect the prop
    if (greeting === "Hola") {
        if (hour < 12) timeBasedGreeting = 'Buenos días';
        else if (hour < 18) timeBasedGreeting = 'Buenas tardes';
        else timeBasedGreeting = 'Buenas noches';
    }

    return (
        <div className="mb-0 pt-6 px-4">
            <h1 className="text-3xl font-bold text-neutral-100 tracking-tight">{timeBasedGreeting},</h1>
            <p className="text-xl text-primary font-medium">{names}</p>
        </div>
    );
};

export default Greeting;
