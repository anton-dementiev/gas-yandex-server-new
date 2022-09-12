const parseString = require('xml2js').parseString;
const e = require('cors');
const { parse } = require('dotenv');
const request = require('request');
const cbr_api = "http://www.cbr.ru/scripts/XML_daily.asp?date_req=02/03/2002";


 module.exports = function getRateCB (formattedDate, charCode, result)  {

    if (charCode === 'RUB') {

        result(false, 1);

    } else {

    let url = `http://www.cbr.ru/scripts/XML_daily.asp?date_req=${formattedDate}`;
    console.log(url);
    request.get(url, {}, (err, res, body)=>{
        if (err) {
            console.log(err);
            return result(err, null);
        } else {
            if (res.statusCode === 200) {
                parseString(body, (err, parsedXml)=>{
                    console.log(err);
                    let filtered = parsedXml["ValCurs"]["Valute"].filter((node) => {
                        return node["CharCode"][0] === charCode;
                    } );

                    console.log(filtered);
                    if (filtered.length > 0) {
                        console.log(filtered[0]["Value"][0]);
                        let rate = parseInt(filtered[0]["Value"][0].replace(",", "."));
                        result(false, rate);
                    } else {
                        return result(true, null);
                    }
                    //console.log(result);
                });
            }
        }
    });

    }
    

 }
