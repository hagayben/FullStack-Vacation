import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./EditVacation.css";
import { useEffect, useState } from "react";
import vacationService from "../../../services/Vacation";
import { Control, useForm, useWatch } from "react-hook-form";
import Vacation from "../../../models/Vacation";
import notify from "../../../services/Notify";
import appConfig from "../../../utils/AppConfig";

function EditVacation(): JSX.Element {

    const params = useParams();
    const vacationId = String(params.vacationId);

    const { register, handleSubmit, setValue, control } = useForm<Vacation>();

    const navigate = useNavigate();

    const [src, setSrc] = useState<string>('');

    function ImageWatched({ control }: { control: Control<Vacation> }) {
        const imageSrc = useWatch({
            control,
            name: 'image',
        })
        if (imageSrc) {
            const file = ((imageSrc as unknown as FileList)[0])
            if (file) {
                const newSrc = window.URL.createObjectURL(file)
                return <img src={newSrc} />
            }
        }
        return <img src={src} />
    }


    useEffect(() => {
        vacationService.getOne(vacationId)
            .then(vacationFromServer => {
                setValue('destination', vacationFromServer?.destination);
                setValue('description', vacationFromServer?.description);
                setValue('startDate', new Date(vacationFromServer?.startDate || '').toISOString().split('T')[0]);
                setValue('endDate', new Date(vacationFromServer?.endDate || '').toISOString().split('T')[0]);
                setValue('price', vacationFromServer?.price);
                setSrc(appConfig.imagesUrl + '/' + vacationFromServer?.imageName || '')
            })
            .catch(err => notify.error(err))

    }, [])

    async function submitVacationData(vacation: Vacation) {
        try {
            vacation.image = (vacation.image as unknown as FileList)[0];
            vacation.id = vacationId;
            const updatedVacation = await vacationService.editVacation(vacation);
            notify.success(`updated a vacation with id ${updatedVacation.id}`)
            navigate(`/vacations`);

        } catch (err) {
            notify.error(err);
        }
    }

    return (
        <div className="EditVacation">
            <h2>Edit vacation</h2>
            <form onSubmit={handleSubmit(submitVacationData)}>

                <label>destination:</label>
                <input type="text" {...register('destination')} />

                <label>description:</label>
                <input type="text" {...register('description')} />

                <label>start date:</label>
                <input type="Date" {...register('startDate')} />

                <label>end date:</label>
                <input type="Date" {...register('endDate')} />

                <label>Price:</label>
                <input type="number" step="0.01" {...register('price')} />


                <label>Image:</label>
                <input type="file" accept="image/*" {...register('image')} />

                <ImageWatched control={control} />
                <br></br>
                <button>update</button>

            </form>
            <NavLink to="/vacations"><button>Cancel</button></NavLink>

        </div>
    );
}

export default EditVacation;
