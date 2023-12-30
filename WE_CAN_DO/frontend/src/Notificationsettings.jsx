import Typography from "@mui/material/Typography"
import Sidebar from "./Sidebar"
import  Button from "@mui/material/Button"
import  Card from "@mui/material/Card"
import { useNavigate } from "react-router-dom"
function Notificationsettings()
{
    const navigate = useNavigate()
    return (
        <>
        <div style={{
            display : "flex"
        }}>
            <Sidebar></Sidebar>
            <div id="get" style={{width : "95vw"}}>
                <Card style={{
                    padding : "1vw",
                    minHeight : "84vh",
                    width : "89.5vw", 
                    margin : "auto", 
                    marginTop : "3vh",
                    backgroundColor : "rgb(40,40,40)"
                }}>
                    <Typography style={{color : "rgb(255,0,255)"}}>*Please ensure that the browser on which you want to recieve
                    supports notifications and service workers. In case if you denied notification permission for this website, 
                    please reset the permissions and enable notifications to recieve notifications for your todo tasks</Typography>
                    <br></br><br></br>
                    <Typography style={{color : "rgb(255,0,255)"}}>*Just to make sure that your session is maintained while
                    subscribing to notifications, logout and login again if you are using this website for almost 1 hour.
                    If your session expires while the registered service worker is subscribing for notifications, then the 
                    subscription might not work</Typography>
                    <br></br><br></br>
                    <Typography style={{color : "rgb(0,255,255)"}}>*To subscribe for notifications and register the service 
                    worker on your browser which will be responsible for sending you intimations of your upcoming todo tasks
                    Click on the Subscribe button</Typography>
                    <br></br>

                    <Button variant="contained"
                    onClick={async ()=>{
                        let flag = 0
                        if('serviceWorker' in navigator)
                        {
                            if('Notification' in window)
                            {
                                const permission = await Notification.requestPermission()
                                if(permission == 'granted')
                                {
                                    const registration = await navigator.serviceWorker.register("/src/we_can_do_sw.js")
                                    setTimeout(()=>{
                                        const worker = registration.active
                                        worker.postMessage(localStorage.getItem("token"))
                                    },750)
                                    flag = 1
                                }
                            }
                        }
                        if(flag == 1)
                        {
                            navigate("/home")
                        }
                        else
                        {
                            document.getElementById("status").innerHTML = "Something went wrong. Please ensure that all the necessities are satisfied"
                        }
                    }}>Subscribe</Button>

                    <br></br><br></br>
                    <Typography style={{color : "rgb(0,0,255)"}}>*In case if you are already subscribed on another device/browser
                    and want to change your preferred device/browser on which you want to recieve notifications to the present one, 
                    even then press the Subscribe button. Note that doing so will result in the previous device/browser not recieving 
                    notifications anymore unless you configure it again.</Typography>
                    <br></br><br></br>
                    <Typography style={{color : "rgb(0,0,255)"}}>*If on any device you want to un-register the service worker then you 
                    can do that by going to Inspect--Application--Service workers and then find the service worker with it's source 
                    name as we_can_do_sw</Typography>
                    <br></br><br></br>
                    <Typography style={{color : "rgb(0,255,255)"}}>*If you don't want to recieve notifications on any device anymore
                    then press the Unsubscribe button</Typography>
                    <br></br>

                    <Button variant="contained"
                    onClick={()=>{
                        let obj = {
                            method : "PUT",
                            headers : {
                                "authorization" : "Bearer " + localStorage.getItem("token")
                            }
                        }
                        fetch("http://localhost:3000/cancelsubscription",obj).then((response_object)=>{
                            if(response_object.status == 200)
                            {
                                navigate("/home")
                            }
                            else
                            {
                                response_object.text().then((data)=>{
                                    document.getElementById("status").innerHTML = data
                                })
                            }
                        })
                    }}>Unsubscribe</Button>

                    <br></br><br></br>
                    <Typography id="status" style={{color : "rgb(255,0,0)"}}></Typography>
                </Card>
            </div>
        </div>
        </>
    )
}

export default Notificationsettings