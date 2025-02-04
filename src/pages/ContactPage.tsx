import { useState } from "react"

const ContactPage =()=>{
    const [firstName,setFirstName] =useState<string>("")
    const [lastName,setLastName] =useState<string>("")
    const [email,setEmail] =useState<string>("")
    const [message,setMessage] =useState<string>("")
    const [mobileNumber,setMobileNumber] =useState<number>(0)
    const SEND_EMAIL_URL =`http://localhost:8080/mail/send?firstName=${firstName}&lastName=${lastName}&email=${email}&message=${message}&mobileNumber=${mobileNumber}`

    const sendEmail =(async()=>{
        const response =await fetch(SEND_EMAIL_URL,{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            }
        })
        if(response.ok){
            const data =await response.json()
            if(data.statusCode ===200){
                console.log("mail sent")
                setTimeout(()=>{
                    setMessage("")
                    setMobileNumber(0)
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                },2000)
            }else{
                console.log(data.message)
            }
        }
    })
    // @ts-expect-error
    return(
        <div className={"p-3 flex flex-col content-center justify-center w-[40%] m-auto leading-8 "}>
           <p className={"font-bold text-4xl mt-4 text-[#5271ff]"}>Contact our team</p>
            <p className={"break-word w-[60%] mt-2 text-xl"}>Got any questions about the products or our platform in general?
                We're here to help.Contact our friendly team 24/7 and get onboard in less than 5 minutes
            </p>
            <div className={"flex mt-4"}>
                <form className={"flex flex-col "} onSubmit={(e)=>{
                    e.preventDefault()
                    sendEmail()
                }}>
                    <div className={"flex gap-2 "}>
                        <input type={"text"} placeholder={"First name"} className={"border border-gray-600 rounded-2xl p-1 mt-4"} required={true} onChange={(e)=>setFirstName(e.target.value)}/>
                        <input type={"text"} className={"border border-gray-600 rounded-2xl p-1 mt-4 "} placeholder={"Last name"} required={true} onChange={(e)=>setLastName(e.target.value)}/>

                    </div>
                    <label className={"mt-4"}>Email</label>
                    <input type={"email"} placeholder={"Email"} className={" border border-gray-600 rounded-2xl p-1"} required={true} onChange={(e)=>setEmail(e.target.value)}/>
                    <label className={"mt-4"}>Phone Number</label>
                    <input type={"tel"} placeholder={"+2547..."} className={"border border-gray-600 rounded-2xl p-1 "} required={true} onChange={(e)=>setMobileNumber(e.target.value)}/>
                    <label className={"mt-4"}>Message</label>
                    <textarea placeholder={"Leave us a message"} className={"border border-gray-600 rounded-2xl p-1 h-52 w-full resize-none"} required={true} onChange={(e)=>setMessage(e.target.value)}></textarea>
                    <button type={"submit"} className={"p-2 bg-black font-bold text-white w-fit mt-10 rounded-2xl "} onClick={()=>{

                    }}>Send message</button>
                </form>
                <div>

                </div>
            </div>
        </div>
    )
}
export default ContactPage