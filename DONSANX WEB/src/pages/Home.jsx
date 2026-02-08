import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Portfolio from '../components/Portfolio';
import LatestNotes from '../components/LatestNotes';

const Home = () => {
    return (
        <main>
            <Hero />
            <Services />
            <Portfolio />
            <LatestNotes />
        </main>
    );
};

export default Home;
