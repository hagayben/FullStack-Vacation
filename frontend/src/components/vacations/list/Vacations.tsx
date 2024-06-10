import vacationsService from "../../../services/Vacation";
import useTitle from "../../../utils/useTitle";
import VacationCard from "../vacationCard/VacationCard";
import { useEffect, useState } from "react";
import notify from "../../../services/Notify";
import Spinner from "../../common/spinner/Spinner";
import { vacationStore } from "../../../redux/VacationState";
import Vacation from "../../../models/Vacation";
import "./Vacations.css";
import { Filters } from "./Filters";

function VacationsList(): JSX.Element {

    useTitle('vacation website');

    const [vacations, setVacations] = useState<Vacation[]>([]);
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [limit, setLimit] = useState(0);
    const [filters, setFilters] = useState('');

    const fetchAll = async () => {
        await vacationsService.getAll(`?page=${page}&${filters}`)
            .then(vacationsFromServer => {
                setVacations(vacationsFromServer.vacations);
                setTotal(vacationsFromServer.total);
                setLimit(vacationsFromServer.limit)
            })
            .catch(error => notify.error(error));
    }

    useEffect(() => {
        fetchAll()
        const unsubscribe = vacationStore.subscribe(() => {

            setVacations([...vacationStore.getState().vacation])
        })

        return unsubscribe;

    }, [page, filters]);


    const onPageClick = (direction: boolean) => {
        const newPage = page + (direction ? 1 : -1);
        if (newPage < 0) {
            return;
        }
        if (newPage * limit > total) {
            return;
        }
        setPage(newPage)
    }

    return (
        <div className="VacationsList">
            <Filters onChange={(f) => {
                let value = '';
                if (f.myVacations) {
                    value += `onlyUser=${f.myVacations}`
                }
                if (f.activeVacations) {
                    value += `&onlyActive=${f.activeVacations}`
                }
                if (f.notStartedVacations) {
                    value += `&notStarted=${f.notStartedVacations}`
                }
                setFilters(value)
            }} />
            {vacations.length === 0 && <Spinner />}
            <div className="wrapper">

            {vacations.map((v, i) => <VacationCard onClick={() => fetchAll()} key={v.id} vacation={v} />)}
            </div>
            <div className="page">
                <button onClick={() => onPageClick(false)}>previous</button> <span className="page">{page + 1}</span>
                <button onClick={() => onPageClick(true)}>next</button>
            </div>
        </div>
    );
}

export default VacationsList;
