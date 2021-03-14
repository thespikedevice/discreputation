const discord=require("discord.js")
const fs=require("fs")

var client=new discord.Client()
const onmessage=require("./filters/onmessage.js")
const ondelete=require("./filters/ondelete.js")
var invites={}

client.on("messageUpdate", (oldmsg, newmsg)=>{
  if (!oldmsg.author.bot) {
    onmessage(newmsg)
    onmessage(oldmsg)
  }
})

client.on("message", (msg) => {
  if (!msg.author.bot) {
    onmessage(msg)
  }
})

client.on("messageDelete", (msg)=>{
  if (!msg.author.bot) {
    ondelete(msg)
  }
})

client.on("ready",() => {
  console.log("Bot is now picking up messages!")
})

client.login(process.env.SECRET)