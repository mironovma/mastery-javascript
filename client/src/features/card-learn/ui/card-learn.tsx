import { observer } from "mobx-react-lite";

import { Card } from "@/entities/card";

export const CardLearn = observer(() => {
    return (
        <Card
            category="JavaScript - начальный уровень"
            question="Как работает прототипное наследование в JavaScript?"
            shortAnswer="Короткий вариант ответа"
            detailedAnswer="Подробный ответ на вопрос текстом, а в будущем сделаю, чтобы можно было добавлять картинки и прочее сюда"
            acceptButtonLabel="Я уже знаю эту карточку"
            declineButtonLabel="Начать учить карточку"
            onAccept={() => {}}
            onDecline={() => {}}
        />
    );
});

/**
 * TODO: Step-by-step:
 *
 * Сначала:
 * 1. Получать первую карточку (проверяю выполнил ли дневной лимит на день или нет: да - congrats окно, нет - карточка)
 *
 * Далее:
 * 1. Реализовать простой функционал: нажатие кнопок и сохранение в соответствующую БД
 * 1.1. Выполнил дневной лимит: да - congrats окно, нет - следующая карточка
 * 2. Появление другой карточки (пока что без анимации) взамен предыдущей
 * 3. Отображение короткого и детализированного варианта ответа
 *
 * Далее:
 * 1. Реализация отображения вариантов ответа, их выбор и последующее отображение короткого варианта ответа
 *
 * Далее:
 * 1. Реализация анимаций при переключении карточек + выбор кнопки: я знаю / начать учить
 */

/**
 * При переходе на страницу для изучения карточек загружаю одну карточку из БД
 * из рандомной выбранной категории - получаю эти данные в виде массива.
 *
 * Отрисовываю название категории карточки и вопрос в шапке.
 *
 * Если нажимаю на кнопку "Уже знаю", то отправляю эту карточку в БД уже изученных карточек пользователем
 * Если нажимаю на кнопку "Начать учить", то отправляю эту карточу в БД для изучения
 * И ГРУЖУ СЛЕДУЮЩУЮ карточку, если дневная норма по изучению еще не выполнена
 * (отслеживать длину массива стора? не вариант, т.к. пользователь может покинуть
 * страницу для изучения)
 * Делать БД со статой, в которой я смогу записывать количество карточек отправленных на изучение,
 * а далее я буду сравнивать это количество с цифрой для изучения в день: ? из dailyCards,
 * если меньше, то буду грузить сразу еще карточку
 *
 * ЕСЛИ НОРМА ВЫПОЛНЕ НА, то показываю congratulation экран, где будет поздравление
 * и две кнопки внизу: учить еще карточки (в будущем реализовать функционал) и "вернуться в меню"
 *
 * Если нажимаю на "глаз", то получаю короткий ответ, вместо кнопок - меняю
 * + под коротким вариантом ответа рисовать по условию кнопку (детальный ответ), если
 * детальный ответ есть в БД. Открываться детальный ответ будет в формате модалки со скроллом.
 * Туда ПОКА ЧТО запихиваю просто текст из БД, а в будущем сделать так, чтобы можно было туда
 * добавлять изображения, описание к изображению, куски кода с подсвечиваемым синтаксисом.
 *
 * Если нажимаю на выбор одного из ответов, то получаю список вариантов ответа, вместо кнопок - меняю
 * + надо в БД указывать варианты ответа в формате { answer: "...", isTrue: boolean }
 * Если нажимаю на верный вариант ответа, то он будет при выборе подсвечиваться зеленым
 * и через 1 секунду варианты ответа будут пропадать и отрисовываться ответ в формате, как если бы
 * я нажал на "глаз"
 *
 */