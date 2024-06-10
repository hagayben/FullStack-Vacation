import { NavLink } from "react-router-dom";
import "./Menu.css";
import { useUser } from "../../../utils/useUser";

function Menu(): JSX.Element {
    const user = useUser()

    return (
        <div className="Menu">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/vacations">list</NavLink>
            {/* < NavLink to="/vacation/add" >Add vacation</NavLink> */}
            {/* <NavLink to="/report">report</NavLink> */}
            {/* <NavLink to="/vacation/edit/:id">Add vacation</NavLink> */}
            {/* <NavLink to="/about">About</NavLink> */}
            {user?.role === 1 && < NavLink to="/vacation/add" >Add vacation</NavLink>}
            {user?.role === 1 && < NavLink to="/report" >Vacation Report</NavLink>}
            {user?.role === 1 && < NavLink to="/vacation/csv" >Download CSV Report</NavLink>}



        </div>
    );
}

export default Menu;
