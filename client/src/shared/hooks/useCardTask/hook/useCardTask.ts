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

// import { useEffect, useReducer, useState } from "react";

// import $api from "@/shared/api/api";
// import { TaskCategory, TaskType } from "@/shared/types/tasks";

// import type { Task } from "../types";

// interface UseCardTaskProps {
//     url: string;
//     category: TaskCategory;
//     type: TaskType;
//     limit?: number;
// }

// enum UseCardTaskAction {
//     LoadStart,
//     LoadSuccess,
//     LoadError,
//     NextQuestion,
// }

// /**
//  * типизировать state и action
//  */
// const reducer = (state: any, action: any) => {
//     switch (action.type) {
//         case UseCardTaskAction.LoadStart:
//             return { ...state, isLoading: true, error: null };
//         case UseCardTaskAction.LoadSuccess:
//             return {
//                 ...state,
//                 isLoading: false,
//                 questions: action.payload,
//                 currentQuestionIndex: 0,
//             };
//         case UseCardTaskAction.LoadError:
//             return { ...state, isLoading: false, error: action.payload };
//         case UseCardTaskAction.NextQuestion:
//             return {
//                 ...state,
//                 currentQuestionIndex: state.currentQuestionIndex + 1,
//             };
//         default:
//             throw new Error();
//     }
// };

// const initialState = {
//     isLoading: false,
//     questions: [],
//     currentQuestionIndex: 0,
//     error: null,
// };

// export const useCardTask = ({
//     url,
//     category,
//     type,
//     limit,
// }: UseCardTaskProps) => {
//     const [state, dispatch] = useReducer(reducer, initialState);

//     useEffect(() => {
//         const fetchTask = async () => {
//             dispatch({ type: UseCardTaskAction.LoadStart });

//             try {
//                 const response = await $api.get<Task[]>(url, {
//                     params: { category, type, limit },
//                 });
//                 dispatch({
//                     type: UseCardTaskAction.LoadSuccess,
//                     payload: response.data,
//                 });
//             } catch (error) {
//                 dispatch({ type: UseCardTaskAction.LoadError, payload: error });
//             }
//         };

//         fetchTask();
//     }, [url, category, type, limit]);

//     return {
//         ...state,
//         onQuestionsLoad: () => dispatch({ type: UseCardTaskAction.LoadStart }),
//         onQuestionsNext: () =>
//             dispatch({ type: UseCardTaskAction.NextQuestion }),
//     };
// };
