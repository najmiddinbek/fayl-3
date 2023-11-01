'use client'

import React, { useState, useEffect } from 'react';

const getTopics = async () => {
    try {
        const res = await fetch('http://localhost:3000/api/pupils', {
            cache: 'no-store',
        });
        if (!res.ok) {
            throw new Error('Failed to fetch topics');
        }

        return res.json();
    } catch (error) {
        console.log('Error loading topics: ', error);
        return { mavzula: [] }; // Provide a default value for 'mavzula' in case of an error
    }
};

export default function FilterOption() {
    const [mavzula, setMavzula] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            const { mavzula } = await getTopics();
            setMavzula(mavzula);
        };

        fetchTopics();
    }, []);

    return (
        <div>
            <select>
                <option>Tanlang</option>
                {mavzula.map((mavzu, index) => (
                    <option key={index} value={mavzu}>
                        {mavzu.shaxs}
                    </option>
                ))}
            </select>
        </div>
    );
}