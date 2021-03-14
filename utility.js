const discord=require("discord.js")
const fs=require("fs")

module.exports={
  getReputation:(userid)=>{
    var userdata=fs.readFileSync("./membermsg.json", "utf8")
    userdata=JSON.parse(userdata)
    return Math.sqrt(userdata[userid]["reputation"])
  }
}