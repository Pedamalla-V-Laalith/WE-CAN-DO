import Grid  from "@mui/material/Grid"
import Sidebar from "./Sidebar"
import  Button from "@mui/material/Button"
import  Card from "@mui/material/Card"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
function Stickynotes()
{
    const navigate = useNavigate()
    const [stickynotes,setStickynotes] = useState([])
    useEffect(()=>{
        let obj = {
            method : "GET",
            headers : {
                "authorization" : "Bearer " + localStorage.getItem("token")
            }
        }
        fetch("http://localhost:3000/allstickynotes",obj).then((response_object)=>{
            if(response_object.status == 200)
            {
                response_object.json().then((data)=>{
                    setStickynotes(data)
                })
            }
        })
    },[])
    return (
        <>
        <div style={{
            display : "flex"
        }}>
            <Sidebar></Sidebar>
            <div style={{width : "95vw"}}>
                <Grid container>
                    <Grid item lg={8} md={6} sm={6}
                    style={{
                        minHeight : "94vh"
                    }}>
                        <div style={{padding : "1vw"}}>
                            <Button variant="outlined"
                            onClick={()=>{
                                navigate("/createstickynote")
                            }}>Create a new Sticky note</Button>
                        </div>
                        <div style={{
                            display : "flex",
                            flexWrap : "wrap",
                            justifyContent : "center"
                        }}>
                            {
                                stickynotes.map((stickynote)=>{
                                    if(!(stickynote.important))
                                    {
                                        return(<Stickynotecard stickynote={stickynote}></Stickynotecard>)
                                    }
                                })
                            }
                        </div>
                    </Grid>
                    <Grid item lg={4} md={6} sm={6}
                    style={{
                        minHeight : "94vh",
                        backgroundColor : "rgb(40,40,40)"
                    }}>
                        <div style={{
                            display : "flex",
                            flexWrap : "wrap",
                            justifyContent : "center"
                        }}>
                            <b style={{color : "rgb(255,255,255)", textAlign : "center", marginTop : "2vh", marginBottom : "1vh"}}>IMPORTANT STICKY NOTES</b>
                            {
                                stickynotes.map((stickynote)=>{
                                    if((stickynote.important))
                                    {
                                        return(<Stickynotecard stickynote={stickynote}></Stickynotecard>)
                                    }
                                })
                            }
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
        </>
    )
}

function Stickynotecard(props)
{
    const navigate = useNavigate()
    return (
        <>
        <Card style={{
                margin : "1vw",
                padding : "1vw",
                width : "400px",
                overflowWrap : "break-word",
                backgroundColor : "rgb(25,25,25)"
            }}>
                <p style={{color : "rgb(255,255,255)"}}><b>Title: </b>{props.stickynote.title}</p>
                <pre style={{color : "rgb(255,255,255)", whiteSpace : "pre-wrap"}}><b>Description: </b>{props.stickynote.notes}</pre>
                <Button variant="contained"
                onClick={()=>{
                    navigate("/editstickynote/" + props.stickynote._id)
                }}>Edit</Button>
        </Card>
        </>
    )
}

export default Stickynotes