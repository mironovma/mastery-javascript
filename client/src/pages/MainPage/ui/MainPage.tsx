import { Button } from "@/shared/ui/button";
import { memo } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <div className="py-10">
                <h1 className="text-3xl font-semibold text-balance">
                    WORLDWIDE DEV POCKET BOOK
                </h1>
                <h2 className="mt-4 text-lg font-semibold break-words text-muted-foreground">
                    Практический handbook для разработчиков любого уровня: от
                    junior до senior. Прокачай свой скилл через игры, задания и
                    соревнований. Easy to learn.
                </h2>

                <div className="mt-4 flex flex-wrap lg:flex-nowrap gap-4">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="w-full uppercase"
                    >
                        <Link to="/cards">+180 карточек Q/A</Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        disabled
                        className="w-full uppercase"
                    >
                        <Link to="/games">+50 игр Q/A</Link>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        disabled
                        className="w-full uppercase"
                    >
                        <Link to="/competitions">+15 соревнований</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default memo(MainPage);
