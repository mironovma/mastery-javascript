import { useTranslation } from "react-i18next";

const MainPage = () => {
    const { t } = useTranslation();

    return <div>{t("Привет")}</div>;
};

export default MainPage;
