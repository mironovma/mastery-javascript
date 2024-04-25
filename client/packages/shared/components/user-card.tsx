interface UserCardProps {
    className?: string;
    username?: string;
}

export const UserCard = ({ className, username }: UserCardProps) => {
    return (
        <div className={className}>
            <span>Добро пожаловать, {username}</span>
        </div>
    );
};
