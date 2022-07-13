import { useEffect } from "react";
import { useUser } from "../context/user";

const Logout = () => {  
  const { logout } = useUser();
  useEffect(() => {
    logout();
  }, []);
  return <p>Loggin out</p>
}

export default Logout;