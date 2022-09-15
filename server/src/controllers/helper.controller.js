const cbrRate  = require('../../config/cbr');



const getRate = (req, res) => {
    
    cbrRate(req.query.date, req.query.charcode, (err, rate)=>{
        if (err) {
            res.send("Couldn't get CBR rate");
        } else {
            res.json({error: false, message: "Success", data: rate});
        }
    });
}




module.exports = {
   getRate,
}