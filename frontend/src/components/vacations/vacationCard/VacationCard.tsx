import { NavLink } from "react-router-dom";
import Vacation from "../../../models/Vacation";
import "./VacationCard.css";
import formatPrice from "../../../utils/formatPrice";
import AdminOptions from "../AdminOptions";
import UserOptions from "../UserOptions";
import { useUser } from "../../../utils/useUser";
import appConfig from "../../../utils/AppConfig";

interface VacationCardProps {
    vacation: Vacation,
    onClick?: () => void;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const user = useUser()
    return (
        <div className="VacationCard">
            {/* edit and delete */}
            {user?.role === 1 && <AdminOptions vacationId={props.vacation.id || ''} />}
            {user?.role === 2 && <UserOptions id={props.vacation.id} amount={props.vacation.amountOfFollowers} isFollowing={props.vacation.isFollowing} onClick={props.onClick} />}
            <div className='image'>
                <NavLink to={`/vacations/details/${props.vacation.id}`}>
                    <img className="card-image" src={`${appConfig.imagesUrl}/${props.vacation.imageName}`} alt='images' />
                </NavLink>
                <div className="destination">
                    {props.vacation.destination}
                </div>

            </div>
            <div className="content">
                <div>
                    description: {props.vacation.description}
                </div>
                <div>

                    start date: {props.vacation.startDate && new Date(props.vacation.startDate).toDateString()}
                </div>
                <div>

                    end date: {props.vacation.endDate && new Date(props.vacation.endDate)?.toDateString()}
                </div>
                <div className="card-price">
                    price: {formatPrice(props.vacation.price)}
                </div>
                <br />
            </div>


        </div>
    );
}

export default VacationCard;
