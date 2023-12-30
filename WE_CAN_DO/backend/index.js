const express = require("express")
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const schedule = require("node-schedule")
const morgan = require("morgan")
const webpush = require("web-push")
const port = 3000
const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("tiny"))

//MongoDB Configuration:-
mongoose.connect('mongodb+srv://<username>:<password>@<cluster_name>.mongodb.net/', { dbName: "data_base_name" })
const userSchema = new mongoose.Schema({
    username : String,
    password : String,
    stickynotes : [{type: mongoose.Schema.Types.ObjectId, ref: "StickyNotes"}],
    todos : [{type: mongoose.Schema.Types.ObjectId, ref: "Todos"}],
    subscription : {}
})
const stickynotesSchema = new mongoose.Schema({
    title : String,
    notes : String,
    important : Boolean
})
const todoSchema = new mongoose.Schema({
    title : String,
    description : String,
    timePoint : String,
    timeOfIntimation: String,
    frequency : String,
    important : Boolean
})
const User = mongoose.model('User',userSchema)
const StickyNotes = mongoose.model('StickyNotes',stickynotesSchema)
const Todos = mongoose.model('Todos',todoSchema)

//Session maintanance strategy:-

const gamma = "shgbfudgksjnfoiergidufheri"
function signing(data)
{
    return (jwt.sign(data, gamma,{expiresIn: "1h"}));
}
async function authenticate(req,res,next)
{
    let authead = req.headers.authorization;
    if(authead)
    {
        let token = authead.split(' ')[1];
        jwt.verify(token,gamma,async (err,data) => {
            if(err)
            {
                res.status(403).send("Invalid Token or Token expired\nsignup or login again to generate a valid Token")
            }
            else
            {
                let user = await User.findOne({username : data.username})
                if(user)
                {
                    req.user = user
                    next()
                }
                else
                {
                    res.status(403).send("Invalid Credentials")
                }
            }
        })
    }
    else
    {
        res.status(403).send("Token is missing")
    }
}

//Route Handlers:-

//User Signup and Login:-
app.post("/signup", async(req,res)=>{
    let credentials = req.body;
    let user = await User.findOne({username : credentials.username})
    if(user)
    {
        res.status(403).send("Username already exists")
    }
    else
    {
        credentials.stickynotes = []
        credentials.todos = []
        credentials.subscription = {}
        let newUser = new User(credentials)
        await newUser.save()
        credentials = {username : newUser.username}
        let token = signing(credentials)
        res.status(200).send({message : "Signup Successfull", token : token})
    }
})
app.post("/login", async(req,res)=>{
    let credentials = req.body;
    let user = await User.findOne({username: credentials.username, password: credentials.password})
    if(user)
    {
        credentials = {username : user.username}
        let token = signing(credentials)
        res.status(200).send({message : "Login Successfull", token : token})
    }
    else
    {
        res.status(403).send("Login failed\nInvalid credentials")
    }
})
app.get("/me",authenticate, async(req,res)=>{
    res.status(200).send({username : req.user.username})
})

//route for subscription and function for push notification:-
/*
Public Key:
BOu_ccZENUK1CyUpPfg6FWq0_RwLa-wzQfCC20AyGZUoW6wSYZJGHRn8B32DVYc4EWDw2YzCSEF3xKlv1OyamxQ

Private Key:
F_YdbRR2U5n4dlt5EONelmaCch1FH3yzjmo8d2Q1N38
*/
const apikeys = {
    publickey : "BOu_ccZENUK1CyUpPfg6FWq0_RwLa-wzQfCC20AyGZUoW6wSYZJGHRn8B32DVYc4EWDw2YzCSEF3xKlv1OyamxQ",
    privatekey : "F_YdbRR2U5n4dlt5EONelmaCch1FH3yzjmo8d2Q1N38"
}
webpush.setVapidDetails(
    'mailto:example123@gmail.com',
    apikeys.publickey,
    apikeys.privatekey
)
app.post("/sendsubscription", authenticate, async(req,res)=>{
    let user = await User.findOne({username : req.user.username})
    user.subscription = req.body
    await user.save()
    res.status(200).send("Subscription registered successfully")
})
app.put("/cancelsubscription",authenticate, async (req,res)=>{
    let user = await User.findOne({username : req.user.username})
    user.subscription = null
    await user.save()
    res.status(200).send("Subscription cancelled successfully")
})
async function scheduleNotifiers(user,todo)
{
    if(user.subscription)
    {
        if(todo.timeOfIntimation != "")
        {
            let rightnow = new Date()
            let timetointimate = new Date(todo.timeOfIntimation + "Z")
            if(rightnow >= timetointimate)
            {
                if(todo.frequency == " ")
                {
                    let recentuser = await User.findOne({username : user.username})
                    if(recentuser.subscription)
                    {
                        webpush.sendNotification(user.subscription,todo.title)
                    }
                }
                else
                {
                    let recentuser = await User.findOne({username : user.username})
                    if(recentuser.subscription)
                    {
                    webpush.sendNotification(user.subscription,todo.title)
                    }
                    schedule.scheduleJob("second"+todo.id, todo.frequency, async ()=>{
                        let now = new Date()
                        let time = new Date(todo.timePoint + "Z")
                        if(now < time)
                        {
                            let recentuser = await User.findOne({username : user.username})
                            if(recentuser.subscription)
                            {
                                webpush.sendNotification(user.subscription,todo.title)
                            }
                        }
                        else
                        {
                            let recentuser = await User.findOne({username : user.username})
                            if(recentuser.subscription)
                            {
                                webpush.sendNotification(user.subscription,todo.title)
                            }
                            schedule.cancelJob("second"+todo.id)
                        }
                    })
                }
            }
            else
            {
                if(todo.frequency == " ")
                {
                    schedule.scheduleJob("first"+todo.id, todo.timeOfIntimation + "Z",async ()=>{
                        let recentuser = await User.findOne({username : user.username})
                        if(recentuser.subscription)
                        {
                            webpush.sendNotification(user.subscription,todo.title)
                        }
                    })
                }
                else
                {
                    schedule.scheduleJob("first"+todo.id, todo.timeOfIntimation + "Z",async ()=>{
                        let recentuser = await User.findOne({username : user.username})
                        if(recentuser.subscription)
                        {
                        webpush.sendNotification(user.subscription,todo.title)
                        }
                        schedule.scheduleJob("second"+todo.id, todo.frequency, async ()=>{
                            let now = new Date()
                            let time = new Date(todo.timePoint + "Z")
                            if(now < time)
                            {
                                let recentuser = await User.findOne({username : user.username})
                                if(recentuser.subscription)
                                {
                                    webpush.sendNotification(user.subscription,todo.title)
                                }
                            }
                            else
                            {
                                let recentuser = await User.findOne({username : user.username})
                                if(recentuser.subscription)
                                {
                                    webpush.sendNotification(user.subscription,todo.title)
                                }
                                schedule.cancelJob("second"+todo.id)
                            }
                        })
                    })
                }
            }
            
        }
    }
}
async function cancelNotifiers(todoid)
{
    schedule.cancelJob("first"+todoid)
    schedule.cancelJob("second"+todoid)
}

//todo routes:-
app.post("/createtodo",authenticate, async(req,res)=>{
    /*
    title : String,
    description : String,
    timePoint : String,
    timeOfIntimation: String,
    frequency : String,
    important : Boolean
    */
    let todo = req.body;
    let newtodo = new Todos(todo)
    await newtodo.save()
    let user = await User.findOne({username : req.user.username})
    user.todos.push(newtodo)
    await user.save()
    scheduleNotifiers(user,newtodo)
    res.status(200).send("Todo task created successfully")
})
app.get("/alltodos",authenticate, async (req,res)=>{
    let user = await User.findOne({username : req.user.username}).populate("todos")
    res.status(200).send(user.todos)
})
app.get("/todo/:id",authenticate, async (req,res)=>{
    let id = req.params.id
    let flag = 0
    let user = await User.findOne({username : req.user.username}).populate("todos")
    for(let i = 0; i < user.todos.length; i++)
    {
        let todo = user.todos[i]
        if(todo.id == id)
        {
            res.status(200).send(todo)
            flag = 1
        }
    }
    if(flag == 0)
    {
        res.status(403).send("todo task does not exist")
    }
})
app.put("/edittodo/:id",authenticate, async (req,res)=>{
    let id = req.params.id
    let newtodo = req.body
    let flag = 0
    let user = await User.findOne({username : req.user.username}).populate("todos")
    for(let i = 0; i < user.todos.length; i++)
    {
        let todo = user.todos[i]
        if(todo.id == id)
        {
            let updatabletodo = await Todos.findByIdAndUpdate(id,newtodo,{new : true})
            if(updatabletodo)
            {
                res.status(200).send("Update successfull")
                cancelNotifiers(id)
                scheduleNotifiers(user,updatabletodo)
                flag = 1
            }
            else
            {
                res.status(403).send("todo task does not exist")
            }
        }
    }
    if(flag == 0)
    {
        res.status(403).send("todo task does not exist")
    }
    
})
app.delete("/deletetodo/:id",authenticate, async (req,res)=>{
    let id = req.params.id
    let flag = 0
    let user = await User.findOne({username : req.user.username}).populate("todos")
    for(let i = 0; i < user.todos.length; i++)
    {
        let todo = user.todos[i]
        if(todo.id == id)
        {
            user.todos.splice(i,1)
            await user.save()
            await Todos.findByIdAndDelete(id)
            cancelNotifiers(id)
            res.status(200).send("Deletion Successfull") 
            flag = 1
        }
    }
    if(flag == 0)
    {
        res.status(403).send("todo task does not exist")
    }
})

//sticky notes routes:-
app.post("/createstickynotes",authenticate, async(req,res)=>{
    /*
    title : String,
    notes : String,
    important : Boolean
    */
    let note = req.body;
    let newnote = new StickyNotes(note)
    await newnote.save()
    let user = await User.findOne({username : req.user.username})
    user.stickynotes.push(newnote)
    await user.save()
    res.status(200).send("Sticky notes created successfully")
})
app.get("/allstickynotes",authenticate, async (req,res)=>{
    let user = await User.findOne({username : req.user.username}).populate("stickynotes")
    res.status(200).send(user.stickynotes)
})
app.get("/stickynote/:id",authenticate, async (req,res)=>{
    let id = req.params.id
    let flag = 0
    let user = await User.findOne({username : req.user.username}).populate("stickynotes")
    for(let i = 0; i < user.stickynotes.length; i++)
    {
        let stickynote = user.stickynotes[i]
        if(stickynote.id == id)
        {
            res.status(200).send(stickynote)
            flag = 1
        }
    }
    if(flag == 0)
    {
        res.status(403).send("Sticky note does not exist")
    }
})
app.put("/editstickynote/:id",authenticate, async (req,res)=>{
    let id = req.params.id
    let newnote = req.body
    let flag = 0
    let user = await User.findOne({username : req.user.username}).populate("stickynotes")
    for(let i = 0; i < user.stickynotes.length; i++)
    {
        let stickynote = user.stickynotes[i]
        if(stickynote.id == id)
        {
            let updatablenote = await StickyNotes.findByIdAndUpdate(id,newnote,{new : true})
            if(updatablenote)
            {
                res.status(200).send("Update successfull")
                flag = 1
            }
            else
            {
                res.status(403).send("Sticky note does not exist")
            }
        }
    }
    if(flag == 0)
    {
        res.status(403).send("Sticky note does not exist")
    }
    
})
app.delete("/deletestickynote/:id",authenticate, async (req,res)=>{
    let id = req.params.id
    let flag = 0
    let user = await User.findOne({username : req.user.username}).populate("stickynotes")
    for(let i = 0; i < user.stickynotes.length; i++)
    {
        let stickynote = user.stickynotes[i]
        if(stickynote.id == id)
        {
            user.stickynotes.splice(i,1)
            await user.save()
            await StickyNotes.findByIdAndDelete(id)
            res.status(200).send("Deletion Successfull") 
            flag = 1
        }
    }
    if(flag == 0)
    {
        res.status(403).send("Sticky note does not exist")
    }
})

//Server running:-
app.listen(port,()=>{
    console.log("App is listening at port 3000")
})