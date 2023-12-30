function urlBase64ToUint8Array(base64String)
{
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for(let i = 0; i < rawData.length; ++i)
    {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}


const public = "BOu_ccZENUK1CyUpPfg6FWq0_RwLa-wzQfCC20AyGZUoW6wSYZJGHRn8B32DVYc4EWDw2YzCSEF3xKlv1OyamxQ"
self.addEventListener("message", async (event)=>{
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly : true,
        applicationServerKey : urlBase64ToUint8Array(public)
    })
    let obj = {
        method : "POST",
        body : JSON.stringify(subscription),
        headers : {
            "content-type" : "application/json",
            "authorization" : "Bearer " + event.data
        }
    }
    fetch("http://localhost:3000/sendsubscription",obj).then((response_object)=>{
        if(response_object.status == 200)
        {
            console.log("Subscription sent")
        }
    })
})

self.addEventListener("push", async (event)=>{
    self.registration.showNotification("WE CAN DO", {body : "You are reminded to do this task:- " + event.data.text()})
})