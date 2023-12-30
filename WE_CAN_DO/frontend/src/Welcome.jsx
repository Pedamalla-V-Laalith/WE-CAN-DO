import { useNavigate }  from "react-router-dom"
import  Grid  from "@mui/material/Grid"
import  Button  from "@mui/material/Button"
import  Card from "@mui/material/Card"
function Welcome()
{
    const navigate = useNavigate()
    return (
        <>
        <Grid container>
            <Grid item lg={8} md={8} sm={8}>
            <div style={{
                backgroundColor : "rgb(20,20,20)",
                minHeight : "89.3vh",
                marginTop : "1px",
                marginLeft : "1px",
                padding : "10px",                
            }}>
                <h1 style={{margin : "0px", color : "rgb(255,255,255)", textAlign : "center"}}><b>WE CAN DO</b></h1>
                <br></br>
                <h2 style={{color : "rgb(255,255,255)"}}>
                    <p>Welcome</p>
                    <p>In this website you will be able to list out your</p>
                    <p>everyday todos.</p>
                    <p>You can prioritize them, organize them and optimize them.</p>
                    <p>Along with that if we have your permission we can even send you notifications</p>
                    <p>to your preffered device about your upcoming todos based on your priorities</p>
                    <p>and customizations on what intervals you want to get notified.</p>
                    <br></br><br></br>
                    <p style={{color : "rgb(0,50,255)"}}>Along with this you can even have your own section of important sticky notes to note anything you want</p>
                </h2>
            </div>
            </Grid>

            <Grid item lg={4} md={4} sm={4}>
                <div style={{
                    display : "flex",
                    justifyContent : "center",
                    alignItems : "center",
                    height : "92vh"
                }}>
                    <div>
                        <h2 style={{
                            color : "rgb(255,255,255)",
                            textAlign : "center"
                        }}>Join now</h2>
                        <br></br>
                        <Button variant="contained"
                        onClick={()=>{
                            navigate("/signup")
                        }}>Signup</Button>
                        <span>{"   "}</span>
                        <Button variant="contained"
                        onClick={()=>{
                            navigate("/login")
                        }}>Login</Button>
                    </div>
                </div>
            </Grid>
        </Grid>
        </>
    )
}

export default Welcome
