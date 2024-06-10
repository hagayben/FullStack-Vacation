import useTitle from "../../../utils/useTitle";
import "./Vacations.css";
import AddVacation from "../addVacation/AddVacation";
import VacationsList from "../list/Vacations";

function Vacations(): JSX.Element {

    useTitle('vacations website');

    return (

        <div className="Vacations">
            <div>

                <VacationsList />
            </div>
            
        </div>
    );
}

export default Vacations;
