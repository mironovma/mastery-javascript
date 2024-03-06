import { AxiosResponse } from "axios";

import $api from "@/shared/api/api";

import { Task } from "../model/types";

export const fetchTasks = async (): Promise<AxiosResponse<Task[]>> => {
    return $api.get<Task[]>("/tasks");
};
