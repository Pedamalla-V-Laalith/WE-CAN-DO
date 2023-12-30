import Card  from "@mui/material/Card"
import TextField from "@mui/material/TextField"
import Sidebar from "./Sidebar"
import Typography from "@mui/material/Typography"
import Switch from "@mui/material/Switch"
import Button from "@mui/material/Button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Createstickynote()
{
    const navigate = useNavigate()
    const [title,setTitle] = useState("")
    const [notes,setNotes] = useState("")
    const [important,setImportant] = useState(false)
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
                    <TextField id="notes" variant="outlined" label="Notes" size="small" fullWidth={true}
                    InputProps={{ style: { color: 'rgb(255,255,255)' } }}
                    style={{backgroundColor : "rgb(58,59,60)"}}
                    onChange={(e)=>{
                        setNotes(e.target.value)
                    }} multiline rows={10}></TextField>
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
                                method : "POST",
                                body : JSON.stringify({
                                    title : title,
                                    notes : notes,
                                    important : important
                                }),
                                headers : {
                                    "content-type" : "application/json",
                                    "authorization" : "Bearer " + localStorage.getItem("token")
                                }
                            }
                            fetch("http://localhost:3000/createstickynotes",obj).then((response_object)=>{
                                if(response_object.status == 200)
                                {
                                    navigate("/stickynotes") 
                                }
                                else
                                {
                                    let a = document.getElementById("status")
                                    a.innerHTML = "Failed to create try again"
                                }
                            })
                        }}>Create</Button> 
                        <Button variant="contained" style={{marginLeft : "25px"}}
                        onClick={()=>{
                            navigate("/stickynotes")
                        }}>Cancel</Button> 
                    </div>
                    <Typography id="status" variant="h6" style={{color : "rgb(255,0,0)"}}>
                        
                    </Typography>
                </Card>
            </div>
        </div>
        </>
    )
}

export default Createstickynote