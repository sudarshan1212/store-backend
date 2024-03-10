const { constants } = require("../constant");

const errorHandler=(err,req,res,next)=>{
const statusCode=res.statusCode?res.statusCode:500
switch (statusCode) { 
    case constants.VALIDATION_ERROR:
        res.json({type:"VALIDATION_ERROR",
        message:err.message,stack:err.stack})
        break;
        case constants.UNAUTHORIZED:
           res.json({type:"UNAUTHORIZED",
        message:err.message,stack:err.stack})
        break;
        case constants.NOT_FOUND:
            res.json({type:"NOT_FOUND",
            message:err.message,stack:err.stack})
        break;
        case constants.FORBIDDEN:
            res.json({type:"FORBIDDEN",
            message:err.message,stack:err.stack})
        break;
      
    default:
       console.log("no error all GOod!");
        break;
}
}
module.exports=errorHandler