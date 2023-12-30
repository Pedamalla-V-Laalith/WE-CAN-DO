import Grid  from "@mui/material/Grid"
import Sidebar from "./Sidebar"
import  Button from "@mui/material/Button"
import  Card from "@mui/material/Card"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
function Alltodos()
{
    const navigate = useNavigate()
    const [todos,setTodos] = useState([])
    useEffect(()=>{
        let obj = {
            method : "GET",
            headers : {
                "authorization" : "Bearer " + localStorage.getItem("token")
            }
        }
        fetch("http://localhost:3000/alltodos",obj).then((response_object)=>{
            if(response_object.status == 200)
            {
                response_object.json().then((data)=>{
                    setTodos(data)
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
                                navigate("/createtodo")
                            }}>Create a new Todo task</Button>
                        </div>
                        <div style={{
                            display : "flex",
                            flexWrap : "wrap",
                            justifyContent : "center"
                        }}>
                            {
                                todos.map((todo)=>{
                                    if(!(todo.important))
                                    {
                                        return(<Todocard todo={todo}></Todocard>)
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
                            <b style={{color : "rgb(255,255,255)", textAlign : "center", marginTop : "2vh", marginBottom : "1vh"}}>IMPORTANT TODOS</b>
                            {
                                todos.map((todo)=>{
                                    if((todo.important))
                                    {
                                        return(<Todocard todo={todo}></Todocard>)
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

function Todocard(props)
{
    const navigate = useNavigate()
    var flag = 0
    var date = ""
    var time = ""
    if(props.todo.timePoint != "")
    {
        let d = new Date(props.todo.timePoint)
        date = date + d.getDate() + "/"
        date = date + (d.getMonth() + 1) + "/"
        date = date + d.getFullYear()
        time = time + d.getHours() + ":"
        time = time + d.getMinutes() + " hours, "
        flag = 1
    }
    if(flag == 1)
    {
        return (
            <>
            <Card style={{
                margin : "1vw",
                padding : "1vw",
                width : "300px",
                overflowWrap : "break-word",
                backgroundColor : "rgb(25,25,25)"
            }}>
                <p style={{color : "rgb(255,255,255)"}}><b>Title: </b>{props.todo.title}</p>
                <pre style={{color : "rgb(255,255,255)", whiteSpace : "pre-wrap"}}><b>Description: </b>{props.todo.description}</pre>
                <p style={{color : "rgb(255,255,255)"}}><b>Time: </b>{time}{date}</p>
                <Button variant="contained"
                onClick={()=>{
                    navigate("/edittodo/" + props.todo._id)
                }}>Edit</Button>
            </Card>
            </>
        )
    }
    else
    {
        return (
            <>
            <Card style={{
                margin : "1vw",
                padding : "1vw",
                width : "300px",
                overflowWrap : "break-word",
                backgroundColor : "rgb(25,25,25)"
            }}>
                <p style={{color : "rgb(255,255,255)"}}><b>Title: </b>{props.todo.title}</p>
                <p style={{color : "rgb(255,255,255)"}}><b>Description: </b>{props.todo.description}</p>
                <Button variant="contained"
                onClick={()=>{
                    navigate("/edittodo/" + props.todo._id)
                }}>Edit</Button>
            </Card>
            </>
        )
    }
}

export default Alltodos