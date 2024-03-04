import { AxiosResponse } from "axios";

import $api from "@/shared/api/api";

import { Card } from "../model/types";

export const fetchCards = async (): Promise<AxiosResponse<Card[]>> => {
    return $api.get<Card[]>("/cards");
};
