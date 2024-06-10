import { NavLink, useNavigate } from "react-router-dom";
import LoginModel from "../../../models/LoginModel";
import notify from "../../../services/Notify";
import "./Login.css";
import { useForm } from "react-hook-form";
import auth from "../../../services/Auth";
import { authStore } from "../../../redux/AuthState";

function Login(): JSX.Element {
    const token = authStore.getState().token;

    const { register, handleSubmit } = useForm<LoginModel>();
    const navigate = useNavigate();

    async function submitLoginData(loginModel: LoginModel): Promise<void> {
        try {
            // service
            await auth.login(loginModel);
            notify.success('you have been successfully logged in');
            navigate('/vacations');
        } catch (err) {
            notify.error(err);
        }
    }

    if (token) {
        return <></>;
    }

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(submitLoginData)}>
                <label>Email:</label>
                <input type="email" {...register('email')} />
                <label>Password:</label>
                <input type="password" {...register('password')} />
                <button>Login</button>
            </form>
            don't have account?
            <br></br>
            <NavLink to="signup">register now</NavLink>
        </div>
    );
}

export default Login;
