import followersService from "../../services/Followers";
import { useNavigate } from "react-router-dom";
import notify from "../../services/Notify";
import { useState } from "react";
// @ts-ignore
import Heart from "react-heart";
import "./UserOptions.css"
type UserOptionsProps = {
    id?: string;
    isFollowing?: number;
    onClick?: () => void
    amount?: number
}

function UserOptions({ id: vacationId, isFollowing, onClick, amount }: UserOptionsProps): JSX.Element {
    const navigate = useNavigate();
    const [isFollowingVacation, setIsFollowingVacation] = useState(Boolean(isFollowing));
    const [isClick, setClick] = useState(false);

    async function likeThisVacation(): Promise<void> {
        if (!vacationId) {
            return;
        }
        try {
            await followersService.follow(vacationId, !isFollowingVacation)
            setIsFollowingVacation(!isFollowingVacation)
            onClick?.()
            navigate('/vacations');
        } catch (err) {
            notify.error(err)
        }
    }

    const onHeartClick = () => {
        likeThisVacation();
        setClick(!isClick)
    }


    return (
        <div className="UserOptions">
            <div className="heart">
                <Heart isActive={isFollowingVacation} onClick={() => onHeartClick()} /> Like
            </div>
            {amount}
        </div>
    );
}

export default UserOptions;
