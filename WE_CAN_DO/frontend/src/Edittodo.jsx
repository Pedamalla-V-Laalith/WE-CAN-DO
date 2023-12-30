import Card  from "@mui/material/Card"
import TextField from "@mui/material/TextField"
import Sidebar from "./Sidebar"
import Typography from "@mui/material/Typography"
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import Switch from "@mui/material/Switch"
import Button from "@mui/material/Button"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"

function Edittodo()
{
    const {id} = useParams()
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [timePoint,setTimepoint] = useState("")
    const [timeOfIntimation,setTimeofintimation] = useState("")
    const [frequency,setFrequency] = useState(" ")
    const [important,setImportant] = useState(false)
    useEffect(()=>{
        let obj = {
            method : "GET",
            headers : {
                "authorization" : "Bearer " + localStorage.getItem("token")
            }
        }
        fetch("http://localhost:3000/todo/" + id, obj).then((response_object)=>{
            if(response_object.status == 200)
            {
                response_object.json().then((data)=>{
                    document.getElementById("title").value = data.title
                    document.getElementById("description").value = data.description
                    document.getElementById("timepoint").value = data.timePoint
                    document.getElementById("timeofintimation").value = data.timeOfIntimation
                    setFrequency(data.frequency)
                    setTitle(data.title)
                    setDescription(data.description)
                    setTimepoint(data.timePoint)
                    setTimeofintimation(data.timeOfIntimation)
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
                <Card style={{
                    padding : "1vw",
                    minHeight : "80vh",
                    width : "73vw", 
                    margin : "auto", 
                    marginTop : "5vh",
                    backgroundColor : "rgb(40,40,40)"
                }}>
                    <TextField id="title" variant="outlined" label="Title" size="small"
                    sx={{ input: { color: "rgb(255,255,255)" } }}
                    style={{backgroundColor : "rgb(58,59,60)"}}
                    onChange={(e)=>{
                        setTitle(e.target.value)
                    }}></TextField>
                    <br></br><br></br>
                    <TextField id="description" variant="outlined" label="Description" size="small" fullWidth={true}
                    InputProps={{ style: { color: 'rgb(255,255,255)' } }}
                    style={{backgroundColor : "rgb(58,59,60)"}}
                    onChange={(e)=>{
                        setDescription(e.target.value)
                    }} multiline></TextField>
                    <br></br><br></br>
                    <Typography variant="h6" style={{display : "inline", color : "rgb(255,255,255)"}}>Time stamp of the task (enter the time in UTC only)</Typography>
                    <input id="timepoint" type="datetime-local"
                    style={{
                        backgroundColor : "rgb(58,59,60)",
                        color : "rgb(255,255,255)",
                        marginLeft : "10px"
                    }}
                    onChange={(e)=>{
                        setTimepoint(e.target.value)
                    }}></input> 
                    <br></br><br></br>
                    <Typography variant="h6" style={{display : "inline", color : "rgb(255,255,255)"}}>Time stamp to notify you about the task (enter the time in UTC only)</Typography>
                    <input id="timeofintimation" type="datetime-local"
                    style={{
                        backgroundColor : "rgb(58,59,60)",
                        color : "rgb(255,255,255)",
                        marginLeft : "10px"
                    }}
                    onChange={(e)=>{
                        setTimeofintimation(e.target.value)
                    }}></input>
                    <br></br><br></br>
                    <Typography variant="h6" style={{display : "inline", color : "rgb(255,255,255)"}}>Select at what intervals do you want to be notified</Typography>
                    <Select id="frequency" label="Intervals" value={frequency}
                    style={{
                        backgroundColor : "rgb(58,59,60)",
                        marginLeft : "10px",
                        color : "rgb(255,255,255)"
                    }}
                    onChange={(e)=>{
                        setFrequency(e.target.value)
                    }}>
                        <MenuItem value={" "}>Just once</MenuItem>
                        <MenuItem value={"*/5 * * * *"}>Every five minutes</MenuItem>
                        <MenuItem value={"*/10 * * * *"}>Every ten minutes</MenuItem>
                        <MenuItem value={"*/30 * * * *"}>Every thirty minutes</MenuItem>
                        <MenuItem value={"0 * * * *"}>Every one hour</MenuItem>
                    </Select>
                    <br></br><br></br>
                    <Typography variant="h6" style={{display : "inline", color : "rgb(255,255,255)"}}>Mark as important</Typography> 
                    <Switch 
                    onChange={()=>{
                        setImportant(!(important))
                    }}></Switch>
                    <div style={{marginTop : "50px", marginBottom : "25px", padding : "10px"}}>
                        <Button variant="contained"
                        onClick={async ()=>{
                            let obj = {
                                method : "PUT",
                                body : JSON.stringify({
                                    title : title,
                                    description : description,
                                    timePoint : timePoint,
                                    timeOfIntimation : timeOfIntimation,
                                    frequency : frequency,
                                    important : important
                                }),
                                headers : {
                                    "content-type" : "application/json",
                                    "authorization" : "Bearer " + localStorage.getItem("token")
                                }
                            }
                            fetch("http://localhost:3000/edittodo/" + id,obj).then((response_object)=>{
                                if(response_object.status == 200)
                                {
                                    navigate("/todos") 
                                }
                                else
                                {
                                    response_object.text().then((data)=>{
                                        let a = document.getElementById("status")
                                        a.innerHTML = data
                                    })
                                }
                            })
                        }}>Edit Changes</Button> 
                        <Button variant="contained" style={{marginLeft : "25px"}}
                        onClick={()=>{
                            let obj = {
                                method : "DELETE",
                                headers : {
                                    "authorization" : "Bearer "+localStorage.getItem("token")
                                }
                            }
                            fetch("http://localhost:3000/deletetodo/" + id,obj).then((response_object)=>{
                                if(response_object.status == 200)
                                {
                                    navigate("/todos") 
                                }
                                else
                                {
                                    response_object.text().then((data)=>{
                                        let a = document.getElementById("status")
                                        a.innerHTML = data
                                    })
                                }
                            })
                        }}>Delete Todo</Button>
                        <Button variant="contained" style={{marginLeft : "25px"}}
                        onClick={()=>{
                            navigate("/todos")
                        }}>Cancel</Button> 
                    </div>
                    <Typography style={{color : "rgb(0,0,255)"}}>
                        *Note that you will only recieve notifications if you already configured notification subscription for a certain device.
                        If you didn't yet configure your notification subscription, then you won't recieve notifications for this todo even after
                        configuring the subscription later on.
                        If you have already configured the subscription but don't want to recieve notification for this todo task then leave 
                        (time stamp to notify) and (interval) entries blank
                    </Typography>
                    <Typography id="status" variant="h6" style={{color : "rgb(255,0,0)"}}>
                        
                    </Typography>
                </Card>
            </div>
        </div>
        </>
    )
}

export default Edittodo