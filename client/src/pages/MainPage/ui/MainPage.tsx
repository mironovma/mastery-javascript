import { Button } from "@/shared/ui/button";
import { PageHeader } from "@/shared/ui/custom/page-header";
import { memo } from "react";
import { Link } from "react-router-dom";

const MainPage = () => {
    return (
        <div>
            <PageHeader
                className="py-10"
                header="WORLDWIDE DEV POCKET BOOK"
                description="Практический handbook для разработчиков любого уровня: от
                junior до senior. Прокачай свой скилл через игры, задания и
                соревнований. Easy to learn."
            />

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
    );
};

export default memo(MainPage);
