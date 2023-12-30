import Typography  from "@mui/material/Typography"
import  Card  from "@mui/material/Card"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import  {useState}  from "react"

function Login()
{
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return (
        <>
        <Card style={{margin : "auto", marginTop : "175px", width : "500px", padding : "30px", backgroundColor : "rgb(40,40,40)", textAlign : "center"}}>
                <Typography style={{color : "rgb(255,255,255)"}} variant="h5">
                    <b>Welcome back to We Can Do</b>
                    <br></br>
                    <b>Please Login to start</b>
                    <br></br>
                </Typography>
                <br></br><br></br>
                <TextField id="username" label="Username" variant="outlined" size="small" fullWidth={true} 
                sx={{ input: { color: "rgb(255,255,255)" } }}
                style={{backgroundColor : "rgb(58,59,60)"}}
                onChange={(e)=>{
                    setUsername(e.target.value)
                }}></TextField>
                <br></br><br></br>
                <TextField id="password" label="Password" variant="outlined" type="password" size="small" fullWidth={true}
                sx={{ input: { color: "rgb(255,255,255)" } }}
                style={{backgroundColor : "rgb(58,59,60)"}}
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}></TextField>
                <br></br><br></br>
                <Button size="small" variant="contained" onClick={()=>{
                    let obj = {
                        method : "POST",
                        body : JSON.stringify(
                            {
                                "username" : username,
                                "password" : password
                            }
                        ),
                        headers : {
                            "content-type" : "application/json"
                        }
                    }
                    fetch("http://localhost:3000/login",obj).then((response_object)=>{
                        if(response_object.headers.get('Content-Type').includes('application/json'))
                        {
                            response_object.json().then((data)=>{
                                let div = document.getElementById("status")
                                div.innerHTML = data.message
                                localStorage.setItem("token",data.token)
                                window.location = "/home"
                            })
                        }
                        else
                        {
                            response_object.text().then((data)=>{
                                let div = document.getElementById("status")
                                div.innerHTML = data
                            })
                        }
                    })
                }}>Login</Button>
                <Typography id="status" variant="h6" style={{color : "rgb(255,255,255)"}}></Typography>
            </Card>
        </>
    )
}

export default Login