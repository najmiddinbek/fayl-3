import { useEffect, useState } from "react";

const getTopics = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/pupils", {
            cache: "no-store",
        });
        if (!res.ok) {
            throw new Error("Failed to fetch topics");
        }

        return res.json();
    } catch (error) {
        console.log("Error loading topics: ", error);
        throw error;
    }
};

export default function TopicsList() {
    const [mavzula, setMavzula] = useState([]);

    useEffect(() => {
        const fetchTopics = async () => {
            try {
                const data = await getTopics();
                setMavzula(data?.mavzula);
            } catch (error) {
                console.log("Error loading topics: ", error);
            }
        };

        fetchTopics();
    }, []);

    const maktablar = Array.from({ length: 54 }, (_, index) => index + 1);

    return (
        <>
            {mavzula.map((topic, index) => (
                <h1 key={index}>{topic.title}</h1>
            ))}
        </>
    );
}