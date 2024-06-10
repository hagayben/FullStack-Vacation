import vacationService from "../../services/Vacation";
import "./AdminOptions.css"
import { NavLink, useNavigate, useParams } from "react-router-dom";
import notify from "../../services/Notify";
import { useEffect, useState } from "react";
import Vacation from "../../models/Vacation";

type AdminOptionsProps = {
    vacationId: string
}


function AdminOptions({ vacationId }: AdminOptionsProps): JSX.Element {
    const navigate = useNavigate();

    const [vacation, setVacation] = useState<Vacation>();

    useEffect(() => {
        vacationService.getOne(vacationId)
            .then(vacationFromServer => setVacation(vacationFromServer))
            .catch(err => notify.error(err))

    }, [])


    const params = useParams();
    // const vacationId = String(params.vacationId);

    async function deleteThisVacation(): Promise<void> {
        if (window.confirm('are you sure you want to delete this vacation?')) {
            try {
                await vacationService.deleteVacation(vacationId);
                notify.success('this vacation has been deleted');
                navigate('/vacations');
            } catch (err) {
                notify.error(err)
            }
        }
    }

    return (

        <div className="AdminOptions">
            <span className="update">
                <NavLink to={`/vacation/edit/${vacationId}`}>update</NavLink>

            </span>
            <span className="delete">
                <NavLink to='#' onClick={deleteThisVacation}>delete</NavLink>
            </span>


        </div>
    );
}

export default AdminOptions;
