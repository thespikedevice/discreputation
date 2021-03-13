const discord=require("discord.js")
const fs=require("fs")

module.exports=(msg)=>{
  var memdat=fs.readFileSync("./membermsg.json", "utf8")
  try {
    // Why did you delete your message? BAD
    memdat[msg.author.id]-=50
    fs.writeFileSync("./membermsg.json", "utf8")
  } catch(err) {
    console.log(err)
  }
}