import { useState } from "react";

import $api from "../api/api";

export const useCardControl = <T>(url: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [questions, setQuestions] = useState<T[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const onQuestionsLoad = async () => {
        setIsLoading(true);
        try {
            const response = await $api.get<T[]>(url);
            setQuestions(response.data);
            setCurrentQuestionIndex(0);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onQuestionsNext = () => {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    return {
        questions,
        isLoading,
        currentQuestionIndex,
        onQuestionsLoad,
        onQuestionsNext,
    };
};
