import style from "./register.module.css";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SessionContext from "../../components/session/SessionContext";

const Login = () => {

  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  const {
    actions: { _Login }
} = useContext(SessionContext);
  let handleSubmit=(e)=>{
    e.preventDefault();
_Login({username,password})
  }


  return (
    <body>
      <header className={style.headerFA}></header>
      <section className={style.backgroudFA}>
        <form className={style.formloginFA} onSubmit={handleSubmit}>
          <h5
            style={{
              marginLeft: "14%",
              display: "inline-block",
              color: "white",
            }}
          >
            Welcome
          </h5>


          <input
            className={style.inputFA}
            placeholder=" Username "
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            className={style.inputFA}
            type="password"
            placeholder=" Password "
            onChange={(e) => setPassword(e.target.value)}

            required
          />

          <label name="msg"></label>

          <input className={style.btnFA} type="submit" value="Login" />
          <Link to="/register">Register?</Link>
        </form>
      </section>
      <footer className={style.headerFA}></footer>
    </body>
  );
};

export default Login;
