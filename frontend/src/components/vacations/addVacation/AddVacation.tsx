import { useForm } from "react-hook-form";
import "./AddVacation.css";
import vacationService from "../../../services/Vacation";
import { useNavigate } from "react-router-dom";
import notify from "../../../services/Notify";
import Vacation from "../../../models/Vacation";
import { NavLink } from "react-router-dom";

function AddVacation(): JSX.Element {

    const { register, handleSubmit, setValue } = useForm<Vacation>();

    const navigate = useNavigate();

    async function submitVacationData(vacation: Vacation) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            const addedvacation = await vacationService.addVacation(vacation);

            notify.success(`added a new vacation with id ${addedvacation.id}`);
            setValue("description", '')
            setValue("destination", undefined)
            setValue('startDate', undefined)
            setValue('endDate', undefined)
            setValue('price', undefined)
            setValue('imageName', undefined)

            navigate('/')

        } catch (err) {
            // alert(err);
            notify.error(err);
        }
    }

    return (
        <div className="AddVacation">
            <h2>Add Vacation</h2>
            <form onSubmit={handleSubmit(submitVacationData)}>

                <label>destination:</label>
                <input type="text" {...register('destination')} />

                <label>description:</label>
                <input type="text" {...register('description')} />



                <label>start Date:</label>
                <input type="Date" {...register('startDate')} />

                <label>end Date:</label>
                <input type="Date" {...register('endDate')} />

                <label>price:</label>
                <input type="number" step="0.01" {...register('price')} />

                <label>Image:</label>
                <input type="file" accept="image/*" {...register('image')} />

                <button>Add Vacation</button>

            </form>
            <NavLink to="/vacations"><button>Cancel</button></NavLink>
        </div>
    );
}

export default AddVacation;
