import { memo } from "react";

import { AuthUser } from "@/features/user-auth";

const AuthorizationPage = () => {
    return <AuthUser open={true} />;
};
export default memo(AuthorizationPage);
