import Card from "@mui/material/Card"
import { useNavigate } from "react-router-dom"

function Sidebar()
{
    const navigate = useNavigate()
    return (
        <>
        <Card style={{
            height : "89.7vh",
            width : "3vw",
            backgroundColor : "rgb(40,40,40)",
            padding : "1vw"
        }}>
            <img src="/src/todo-icon.png" style={{
                width : "3vw",
                mixBlendMode : "color-burn",
                marginTop : "20px",
                marginBottom : "20px"
            }}
            onClick={()=>{
                navigate("/todos")
            }}></img>
            <img src="/src/stickynotes-icon.png" style={{
                width : "3vw",
                mixBlendMode : "color-burn",
                marginTop : "20px",
                marginBottom : "20px"
            }}
            onClick={()=>{
                navigate("/stickynotes")
            }}></img>
            <img src="/src/notification-icon.png" style={{
                width : "3vw",
                mixBlendMode : "color-burn",
                marginTop : "20px",
                marginBottom : "20px"
            }}
            onClick={()=>{
                navigate("/notificationsettings")
            }}></img>
        </Card>
        </>
    )
}

export default Sidebar