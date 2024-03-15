import { memo } from "react";

import { ToggleFeatures } from "@/shared/lib/toggle-features";
import { SectionHeader } from "@/shared/ui/custom/section-header";
import { SectionMenu } from "@/shared/ui/custom/section-menu";
import { mainMenuLinks } from "@/shared/const/main-menu-links";

import { MainPageDepricated } from "./MainPageDepricated";

/**
 * TODO: сделать микрофронты: главная страница на Next.js,
 * чтобы быстро грузилось + SEO. Сделать кнопку регистрации, а после регистрации попадаем на главную,
 * где пользователь может приступить к изучению.
 *
 * TODO:
 * 1. Добавить экстра-мод (не влияет на статистику):
 * browse flashcards - выбираешь категории (уже выученные, на повторении, др. категории) и все карточки повторяешь
 * hands-free - озвучивает вопрос, а далее через 5 секунд озвучивает ответ
 *
 * 2. Добавить статистику
 * week - вверху дни недели по двум буквам: если учил сегодня, то отмечаем + указываем на сегодняшний день стрелкой
 * record - текущий стрик: учил каждый день без остановок дней + лучший стрик
 * learned today - 0/3 указывает сколько сегодня выучил из назначенных + можно редактировать сколько в день учить
 *
 * 3. Статистика за неделю, месяц, год в виде столбчатых графиков + снизу в виде текста
 * зеленый - выучено (когда 7 раз повторил карточку и нажал "знаю ответ")
 * розовый - выучил сегодня (когда первый раз попалась карточка и начал ее учить)
 * желтый - повторил за сегодня
 * серый - за сегодня "знаю ответ" (т.е. пропустил и не стал добавлять в "учить")
 */
const MainPage = () => {
    return (
        <ToggleFeatures
            feature="isAppRedesigned"
            on={
                <div>
                    <SectionHeader>Повторение</SectionHeader>
                    <SectionMenu items={mainMenuLinks} />
                </div>
            }
            off={<MainPageDepricated />}
        />
    );
};

export default memo(MainPage);
