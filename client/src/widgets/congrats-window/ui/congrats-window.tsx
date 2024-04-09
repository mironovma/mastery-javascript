import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/button";
// TODO: Сделать алиасы для изображений и в конфиге вебпака их копировать в общий бандл
// + сделать, чтобы не только ссылкой можно было получать изображения, но и как компонент (см. file-loader webpack)
import CongratulationsImg from "../../../../public/assets/img/target.png";

interface CongratsWindowProps {
    className?: string;
    dailyCardLimitToLearn: number;
}

export const CongratsWindow = memo(
    ({ className, dailyCardLimitToLearn }: CongratsWindowProps) => {
        const { t } = useTranslation();
        const navigate = useNavigate();

        return (
            <div className={className}>
                <div className="w-full h-card flex flex-col">
                    <div className="min-h-60 flex flex-col items-center p-5 text-center bg-primary-foreground rounded-md">
                        <div className="w-20 h-20 rounded-full bg-background flex justify-center items-center">
                            <img
                                className="w-12 h-12"
                                src={CongratulationsImg}
                                alt="congratulation"
                            />
                        </div>

                        <h2 className="mt-4 text-xl text-muted-foreground font-semibold">
                            Поздравляем!
                        </h2>
                        <p className="mt-4 text-lg text-pretty">
                            Сегодня вы выучили{" "}
                            {t("кол-во выученных сегодня", {
                                count: dailyCardLimitToLearn,
                            })}
                            . Продолжайте в том же духе!
                        </p>
                    </div>

                    <div className="mt-auto mb-0 mx-auto flex flex-col">
                        {/* TODO: сделать функционал, которые будет просто перекидывать на страницу для повторения */}
                        <Button variant="outline" size="lg" disabled>
                            Повторить выученные карточки
                        </Button>
                        <Button
                            variant="link"
                            size="lg"
                            onClick={() => navigate("/app")}
                        >
                            Вернуться в меню
                        </Button>
                    </div>
                </div>
            </div>
        );
    },
);
