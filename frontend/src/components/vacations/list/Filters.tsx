import { useEffect, useState } from "react";
import { useUser } from "../../../utils/useUser";

type FiltersProps = {
    onChange?: (filters: {
        myVacations: boolean;
        activeVacations: boolean;
        notStartedVacations: boolean;
    }) => void
}

export const Filters = ({ onChange }: FiltersProps) => {
    const user = useUser();

    const [myVacations, setMyVacations] = useState(false);
    const [activeVacations, setActiveVacations] = useState(false);
    const [notStartedVacations, setNotStartedVacations] = useState(false);

    useEffect(() => {
        onChange?.({
            activeVacations,
            myVacations,
            notStartedVacations
        })
    }, [onChange, myVacations,
        activeVacations,
        notStartedVacations])

    if (user?.role === 1) {
        return null;
    }

    return <div>
        <h4>Filters</h4>
        <div>
            <label>
                <input
                    type="checkbox"
                    checked={myVacations}
                    onChange={() => setMyVacations(!myVacations)}
                />
                My Vacations
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={activeVacations}
                    onChange={() => setActiveVacations(!activeVacations)}
                />
                Active Vacations
            </label>
            <label>
                <input
                    type="checkbox"
                    checked={notStartedVacations}
                    onChange={() => setNotStartedVacations(!notStartedVacations)}
                />
                Not started Vacations
            </label>

        </div>
    </div>
}

// ?adfas=sdf&asdasd=3465246