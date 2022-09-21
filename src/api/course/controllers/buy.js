const jwt = require("jsonwebtoken")
require("dotenv").config()
const axios = require("axios")
const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController("api::course.course", ({ strapi }) => ({
  async buy(ctx) {
    const token = ctx.request.body.token
    const courseid = ctx.request.body.courseid
    console.log(token)

    //jwt.verify 
    jwt.verify(token, process.env.JWT_SECRET, async function (err, decoded) {
      if (err) {
        console.log(err)
      } else {
        console.log(decoded)

        //put in axoios
        let courseArray = []
        let data = {}
        await axios.get("http://localhost:1337/api/users/" + decoded.id).then(res => {
          if (res.data.subscribed == null) {
            data = { subscribed: { courses: [courseid] } }
          }
          else {
            courseArray = res.data.subscribed.courses
            courseArray.push(courseid)
            data = { subscribed: { courses: courseArray } }
          }
          console.log(res.data)
        }).catch(err => console.log('there are some errors in getting in coursesubscribed', err))

        console.log(courseArray)
        await axios.put("http://localhost:1337/api/users/" + decoded.id, data).then(res => console.log(res.data))
          .catch(err => console.log('there are some errors in buy '))
      }
    })
    ctx.send("sent token ...")
  },
  async uploadpic(ctx) {
    const files = ctx.request.files.files
    // console.log(files)
    
   console.log(files)
   await axios.default.post("http://localhost:1337/api/upload/",files).then(res=>console.log(res.data)).catch(err=>console.log('there are some err'))
    // await axios.post("http://localhost:1337/api/upload", data).then(res => {console.log(res.data)
  
    ctx.send("sent token ...")
  // })
  // .catch(err=>console.log('there are some error when uploading files',err))

  
 
  },
  async ui(ctx){



    const files = ctx.request.files
    let image_id = ctx.request.image_id;
    let token = ctx.request.body.token;
    let user_id = ctx.request.body.user_id;
    
    let data = {files:files}
    let is_image = ""
    await axios.get("http://localhost:1337/api/users/"+user_id).then(res=>res.data).then(res=>{
        
     if(res.image){
         is_image = true
     }
       
       
    
    })
    
    
    if(is_image){
        await axios.delete("http://localhost:1337/api/upload/files/"+image_id).then(async res=>console.log('image deleted')).then(async res=>{
    
             axios.post("http://localhost:1337/api/upload", files, {
                headers: {
                  "Authorization": "Bearer " + token
                }}).then(res=>{
                    image_id = res.data.id
                    console.log(image_id)
                }).then(async res=>{
         let data = { image:image_id}
                  await   axios.put("http://localhost:1337/api/users/"+user_id,data).then(res=>{
                        console.log(res.data)
                    })
                })
    
    
        }).catch(err=>console.log('error in deleting'))
    
    }
    
    
    await axios.post("http://localhost:1337/api/upload", data).then(res => {console.log(res.data)
    
    ctx.send("sent token ...")
    }).catch(err=>console.log('there are some error when uploading files',err))

   }


  
}))