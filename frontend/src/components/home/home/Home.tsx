import Login from "../../auth/login/Login";
import "./Home.css";

function Home(): JSX.Element {
   

    return (
        <div className="Home">
            <h1>welcome to vacation web</h1>
			<Login/>
        </div>
    );
}

export default Home;
