const logger = (req,res,next)=>{
    console.log("we are in middleware")
    next();
};
module.exports = logger;