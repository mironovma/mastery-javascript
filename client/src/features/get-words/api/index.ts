import { AxiosResponse } from "axios";

import $api from "@/shared/api/api";

import { Word } from "../model/types";

export const fetchWords = async (): Promise<AxiosResponse<Word[]>> => {
    return $api.get<Word[]>("/words");
};
