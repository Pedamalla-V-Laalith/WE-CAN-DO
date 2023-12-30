import Grid  from "@mui/material/Grid"
import Card from "@mui/material/Card"
import { useNavigate } from "react-router-dom"
function Home()
{
    const navigate = useNavigate()
    return (
        <>
        <div style={{
            minHeight : "92vh",
            display : "flex",
            justifyContent : "center",
            alignItems : "center"
        }}>
            <div>
                <Grid container>
                    <Grid item lg={6} md={6} sm={6}>
                        
                            <Card style={{
                                marginLeft : "auto",
                                marginRight : "25px",
                                padding : "10px",
                                width : "250px",
                                textAlign : "center",
                                color : "rgb(255,255,255)",
                                backgroundColor : "rgb(20,20,20)"
                            }}
                            onClick = {()=>{
                                navigate("/todos")
                            }}><b>TODOS</b></Card>
                        
                    </Grid>
                    <Grid item lg={6} md={6} sm={6}>
                        
                            <Card style={{
                                marginLeft : "25px",
                                marginRight : "auto",
                                padding : "10px",
                                width : "250px",
                                textAlign : "center",
                                color : "rgb(255,255,255)",
                                backgroundColor : "rgb(20,20,20)"
                            }}
                            onClick = {()=>{
                                navigate("/stickynotes")
                            }}><b>STICKY NOTES</b></Card>
                        
                    </Grid>
                    <Grid item lg={12} md={12} sm={12}>
                        
                            <Card style={{
                                marginLeft : "auto",
                                marginRight : "auto",
                                marginTop : "20px",
                                padding : "10px",
                                width : "250px",
                                textAlign : "center",
                                color : "rgb(255,255,255)",
                                backgroundColor : "rgb(20,20,20)"
                            }}
                            onClick = {()=>{
                                navigate("/notificationsettings") 
                            }}><b>NOTIFICATION SETTINGS</b></Card>
                        
                    </Grid>
                </Grid>
            </div>
        </div>
        </>
    )
}

export default Home