import { Link, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);


  const navigate = useNavigate()
  const logout = () => {
    setCookies("access_token", "")
    window.localStorage.removeItem("useID")
    navigate("/auth")
  }
  return (
    <>
      <div className="navbar">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/createrecipe">
          Create Recipe
        </Link>
        <Link className="link" to="/savedrecipe">
          Saved
        </Link>
        {!cookies.access_token ? (
          <Link className="link" to="/auth">
            Login/Register
          </Link>
        ) : (
          <button onClick={logout} style={{border:"2px solid red",color:"white",backgroundColor:"#0F67B1",border:"none", padding: "7px 10px", borderRadius:"5px", display:"flex"}}>Logout</button>
          
        )}
      </div>
    </>
  );
};
