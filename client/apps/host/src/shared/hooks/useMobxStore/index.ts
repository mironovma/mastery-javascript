import { useContext } from "react";
import { StoreMobxContext } from "@/app/providers/store-mobx-provider";

export const useMobxStore = () => useContext(StoreMobxContext);
