import  Card from "@mui/material/Card"
import Button from "@mui/material/Button"
import  Typography from "@mui/material/Typography"
import { useEffect, useState } from "react"
import { useNavigate }  from "react-router-dom"

function Topbar()
{
    const navigate = useNavigate()
    const [user,setUser] = useState(null)
    useEffect(()=>{
        let token = localStorage.getItem("token")
        if(token)
        {
            let obj ={
                method : "GET",
                headers : {
                    "authorization" : "Bearer "+token
                }
            }
            fetch("http://localhost:3000/me",obj).then((response_object)=>{
                if(response_object.status == 200)
                {
                    response_object.json().then((data)=>{
                        setUser(data.username)
                    })
                }
            })
        }
    },[])
    if(user == null)
    {
        return (
            <>
            <Card style={{
                backgroundColor : "rgb(25,25,25)",
                display : "flex",
                justifyContent : "space-between",
                padding : "10px"
            }}>
                <Typography variant = "h5" style = {{color : "rgb(255,255,255)"}}><em><b>WE CAN DO</b></em></Typography>
                <div>
                    <Button variant="contained" 
                    onClick = {()=>{
                        navigate("/signup")
                    }}>Signup</Button>
                    <span>  </span>
                    <Button variant="contained" 
                    onClick = {()=>{
                        navigate("/login")
                    }}>Login</Button>
                </div>
            </Card>
            </>
        )
    }
    else
    {
        return (
            <>
            <Card style={{
                backgroundColor : "rgb(25,25,25)",
                display : "flex",
                justifyContent : "space-between",
                padding : "3px"
            }}>
                <Typography variant = "h5" style = {{color : "rgb(255,255,255)"}}><em><b>WE CAN DO</b></em></Typography>
                <div>
                    <b style={{color: "rgb(255,255,255)", marginRight : "5px"}}>{user}</b>
                    <span>  </span>
                    <Button variant="contained" 
                    onClick = {()=>{
                        localStorage.removeItem("token")
                        window.location = "/"
                    }}>Logout</Button>
                </div>
            </Card>
            </>
        )
    }
}

export default Topbar