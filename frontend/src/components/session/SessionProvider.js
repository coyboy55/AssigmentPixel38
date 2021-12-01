import React, { useState } from "react";
import SessionContext from "./SessionContext";
import { setCookie, getCookie, removeCookie } from "../../cookie";
import { toast } from "react-toastify";
import { gql, useMutation, useQuery } from "@apollo/client";

const login = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

const GETUSER = gql`
  query User($text: String!) {
    user(remember_token: $text) {
      username
    }
  }
`;

export default function SessionProvider({ children }) {
  const [session, setValue] = useState({
    user: {
      token: getCookie("token"),
    },
  });
  let token = getCookie("token");

  const [LOGIN, { loading, error }] = useMutation(login, {
    fetchPolicy: "no-cache",
    nextFetchPolicy:'no-cache',
 
    onCompleted: ({ login}) => {
  
      if (login) {
        setCookie("token", login);
        updateSession({ user: { token: login } });
      } else {
        toast.error("username or password incorrect");
      }
    },
  });

  const { error: erro1 } = useQuery(GETUSER, {
    variables: { text: token ? token : '' },
    fetchPolicy: "no-cache",
    nextFetchPolicy:'no-cache',
    onCompleted: (data) => {
if(data && data.user && data.usernmae!=null){
   let username =data && data.user && data.user.username;
      toast.success("welcome " + username);
}
     


    },
  });
  if (erro1) return "eror"+erro1.message;

  async function _Login({ username, password }) {
    await LOGIN({ variables: { username: username, password: password } });

    if (loading) return "login...";
    if (error) return `login error! ${error.message}`;
  }

  async function logout() {
    updateSession({ user: { token: null } });
    removeCookie("id");
    removeCookie("token");
  }

  function updateSession(nextSession) {
    let value =
      typeof nextSession === "function"
        ? nextSession
        : (prevSession) => ({ ...prevSession, ...nextSession });
    setValue(value);
  }

  const context = {
    session,
    actions: {
      _Login,
      logout,
      updateSession,
    },
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
}
