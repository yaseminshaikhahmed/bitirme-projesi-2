
module.exports.get_message = async(req,res)=>{
 try{
    res.render('../public/views/messages')
  }
  catch(err){
    console.log(err.message)
  }

}