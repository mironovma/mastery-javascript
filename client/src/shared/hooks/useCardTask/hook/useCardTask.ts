import { useState } from "react";

import $api from "@/shared/api/api";
import { TaskCategory, TaskType } from "@/shared/types/tasks";

import type { Task } from "../types";

interface UseCardTaskProps {
    url: string;
    category: TaskCategory;
    type: TaskType;
    limit?: number;
}

export const useCardTask = ({
    url,
    limit,
    category,
    type,
}: UseCardTaskProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [questions, setQuestions] = useState<Task[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);

    const onQuestionsLoad = async () => {
        setIsLoading(true);

        try {
            const response = await $api.get<Task[]>(url, {
                params: { category, type, limit: limit?.toString() },
            });

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
