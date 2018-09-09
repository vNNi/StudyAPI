module.exports=(req,res,next)=>{
    var apiToken = req.headers['apitoken'];
    console.log(apiToken);
    if(apiToken!="XjpcXLgDcrXwgNXue6HDjQfBrDC2Lqm8QbsjPaAMfkG5yfNNyxeP7mVt"){
        return res.status(401).json({
            message: "Contate StudyJa para obter acesso a nossa API."
        })
    }else{
        next();
    }
}