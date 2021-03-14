const discord=require("discord.js")
const fs=require("fs")

module.exports=(msg)=>{
  var memdat=fs.readFileSync("./membermsg.json", "utf8")
  memdat=JSON.parse(memdat)
  if (msg.author.id in memdat) {
    var mydata=memdat[msg.author.id]
    var lastmessage=mydata["lastmessage"]
    var lastmessagetime=mydata["lmt"]
    var reputation=mydata["reputation"]
    var repchange=0
    // First, compare this message to the last message
    if (msg.content==lastmessage) {
      repchange-=100
    }
    // A long string with no spaces is likely character spam
    if (!msg.content.includes(" ") && msg.content.length>20) {
      repchange-=50
    }
    // Any string with more than 8 emojis should not reward reputation
    if ((msg.content.match(/,/g)||[]).length>16) {
      repchange-=(5*(msg.content.match(/,/g)||[]).length)
    }
    // Don't ping everyone
    if (msg.mentions.everyone){
      repchange-=25
    }
    // I sent a photo!
    if (msg.attachments.array.length==1) {
      repchange+=50
    }
    // You are counted as inactive after 12 hours of no chatting
    if (Date.now()-lastmessagetime>43200000) {
      repchange-=10
    }
    // Spamming confirmed
    if (Date.now()-lastmessagetime<1000) {
      repchange=-1000
    }
    // Gain a random amount of reputation points on top of message specific filters
    repchange+=Math.round(Math.random()*10+10)
    if (repchange<-50) {
      repchange=-50
    }
    mydata["reputation"]+=repchange
    mydata["lmt"]=Date.now()
    mydata["lastmessage"]=msg.content
    memdat[msg.author.id]=mydata
    fs.writeFileSync("./membermsg.json", JSON.stringify(memdat))
    var myrep=mydata["reputation"]
    msg.channel.send("New reputation: " + 5*(1/(1+Math.pow(Math.E, -Math.sqrt(myrep)))))
  } else {
    memdat[msg.author.id]={
      "lastmessage": msg.content,
      "lmt": Date.now(),
      "reputation": 0
    }
    fs.writeFileSync("./membermsg.json", JSON.stringify(memdat))
    msg.channel.send("New reputation: 0")
  }
}
