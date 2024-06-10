import Login from "../../auth/login/Login";
import Signup from "../../auth/signup/Signup";
import DownloadCSV from "../../downloadCSV/downloadCSV/downloadCSV";
import Home from "../../home/home/Home";
import AddVacation from "../../vacations/addVacation/AddVacation";
import Add from "../../vacations/addVacation/AddVacation";
import EditVacation from "../../vacations/editVacation/EditVacation";
import Vacations from "../../vacations/vacation/Vacations";
import VacationsReport from "../../vacationsReport/vacationsReport/vacationsReport";
import Page404 from "../page404/Page404";
import { Routes, Route, Navigate } from 'react-router-dom';
function Routing(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/signup" element={<Signup />} />

            <Route path="/vacations" element={<Vacations />} />
            <Route path="/vacation/add" element={<AddVacation />} />
            <Route path="/vacation/edit/:vacationId" element={<EditVacation />} />
            <Route path="/report" element={<VacationsReport/>} />
            <Route path="/vacation/csv" element={<DownloadCSV/>} />

            <Route path="*" element={<Page404 />} />

            {/* <Route path="/login" element={<Login />} /> */}
            {/* <Route path="/home" element={<Navigate to="/" />} /> */}
            {/* <Route path="/vacation/details/:vacationId" element={<VacatonDetails />} /> */}
        </Routes>

    );
}

export default Routing;
