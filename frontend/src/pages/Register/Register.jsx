import style from "./register.module.css";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { gql, useMutation } from '@apollo/client';
import { toast } from "react-toastify";

const createUser = gql`
  mutation CreateUser($name: String!,$username: String!,$password: String!) {
    createUser(name: $name,username:$username,password:$password) {
      id
      username
    }
  }
`;

const Register = () => {
  let [name, setName] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConf, setPasswordCOnf] = useState("");

  let history=useHistory();

  const [CREATEUSER, { loading, error }] = useMutation(createUser,{
    onCompleted:()=>{
history.push('/login')
    }
  });

  let handleSubmit=(e)=>{
    e.preventDefault();
    password === passwordConf ? 
    CREATEUSER({ variables: { name: name,username:username,password:password } })
    :
    toast.warning('password does not match')
  }
  
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  
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
            type="text"
            placeholder=" Name "
            onChange={(e) => setName(e.target.value)}
            required
          />

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
            onChange={(e) => setPasswordCOnf(e.target.value)}

            required
          />
          <input
            className={style.inputFA}
            type="password"
            placeholder=" Confirm password "
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label name="msg"></label>

          <input className={style.btnFA} type="submit" value="Register" />
          <Link to="/login">SignIn?</Link>
        </form>
      </section>
      <footer className={style.headerFA}></footer>
    </body>
  );
};

export default Register;
