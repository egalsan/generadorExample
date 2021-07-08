const moment = require("moment-timezone");
const neatCsv = require('neat-csv');
const fs = require('fs');
const path = require("path");


      
async function createData(hist,channel,total,index,date){

    const { dac } = require("../common/common");



const sum = hist.reduce((a, b) => a + b);

for (let i = 0; i < total; i++) {
    const b = Math.random() * sum;
    let acc = 0;
    for (j = 0; j < hist.length && acc < b; j++) {
        acc += hist[j];
    }
    var o={
        data:{
            date: await createDate(j-1,date),
            type:await createType(),
            amount: await createAmount(),
            channel:channel
        },       
        meta:{
            index:index,
            channel:channel
        }
        
    }

    await dac.insert.save(o);
    console.log(j - 1);     //TODO: generar transaccion
}

}


async function createDate(start,date){

    date.set({hour:start,
         minute:Math.round(Math.random() * 60),
         second:Math.round(Math.random() * 60)
    });
    
    return date;
}

async function createAmount(){
    var amount= Math.random();
    amount>.9 ? amount=amount*1000000 : amount=amount*10000
    return parseFloat( amount.toFixed(2));
}

async function createType(){

    const catalog=["Deposito", "Retiro", "Transferencia", "Pago"];
    return catalog[Math.floor(Math.random()*4)];
}


async function generateRange(arguments){

    
    var data= fs.readFileSync(path.join(__dirname,"Samples/Suc.csv"));
    let content=await neatCsv(data);
    var hist=content.map((c)=>parseInt(c.SUC));
    var day=moment(arguments,"YYYY-MM-DD").startOf('day');
    var channel=arguments[3];//Object.keys(content[0])[0];
    var total=parseInt(arguments[5]); //100000;

    var index=arguments[2];//"trans";

        await createData(hist,channel,total,index,day);
    //}
}

const arguments=process.argv;
generateRange(arguments);

