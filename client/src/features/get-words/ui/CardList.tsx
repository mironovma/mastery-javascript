import { useState } from "react";
import { fetchWords } from "../api";
import { Word } from "../model/types";

export const CardList = () => {
    const [words, setWords] = useState<Word[]>([]);

    const loadWords = async () => {
        const response = await fetchWords();
        setWords(response.data);
    };

    return <div>CardList</div>;
};
