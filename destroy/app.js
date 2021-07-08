const { dac } = require("../common/common");
const moment = require("moment-timezone");


async function deleteRange(arguments){

    var index=arguments[2];
    var channel=arguments[3];
    var startDate=moment(arguments[4]+"T"+arguments[5],"YYYY-MM-DD").startOf('day');
    var endDate=moment(startDate).endOf('day');//TODO VErificar para mas dias
    var percent=parseInt(arguments[8]); //100000;

    var o={
        size:0,
        data:{
            startDate: arguments[4]+"T"+arguments[5],
            endDate:arguments[6]+"T"+ arguments[7]
        },       
        meta:{
            index:index,
            channel:channel,
            from:startDate,
            to:endDate
        }
        
    }
    var total= await dac.insert.count(o);
    o.size=Math.round(total*(parseInt(arguments[8])/100))
    await dac.insert.delete(o)
}


const arguments=process.argv;
deleteRange(arguments);
