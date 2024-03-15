import { PencilIcon, PlusCircle, RepeatIcon, ZapIcon } from "lucide-react";

/**
 * TODO: сделать подгрузку меню динамически?
 */
export const mainMenuLinks = [
    {
        Icon: PencilIcon,
        iconColor: "text-gray-400",
        header: "3 категории выбрано",
        to: "categories",
    },
    {
        Icon: PlusCircle,
        iconColor: "text-green-400",
        header: "Учить новые карточки",
        description: "Выучено сегодня: 0 из 5",
        to: "learn",
    },
    {
        Icon: RepeatIcon,
        iconColor: "text-yellow-400",
        header: "Повтор",
        description: "Карточек для повторения: 0",
        to: "repeat",
    },
    {
        Icon: ZapIcon,
        iconColor: "text-blue-400",
        header: "Микс-режим",
        description: "Новые и карточки для повторения",
        to: "mix-mode",
    },
];
