import { memo } from "react";

import { UserCard } from "@packages/shared/components/user-card";

const AdminPage = () => {
    return (
        <div>
            <div>ADMIN PAGE</div>
            <div>
                <UserCard username="mironov_ma" />
            </div>
        </div>
    );
};

export default memo(AdminPage);
