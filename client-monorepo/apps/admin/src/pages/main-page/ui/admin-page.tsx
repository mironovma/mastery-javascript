import { memo } from "react";
import { useTranslation } from "react-i18next";

const AdminPage = () => {
    const { t } = useTranslation();

    return <div>{t("Админка")}</div>;
};

export default memo(AdminPage);
