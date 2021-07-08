var express = require("express");
var router = express.Router();
const bl = require("../bl");
const dac = require("common");
const moment = require("moment");

/* GET home page. */
router.get("/", function (req, res, next) {
    res.render("index", { title: "Express" });
});

router.get("/elasticData", async (req, res) => {
    const start=req.query.startDate=="" ? moment().startOf('day').toDate() : moment(req.query.startDate).startOf('day').toDate();
    const end=req.query.endDate =="" ? moment().subtract(5, "minutes").toDate(): moment(req.query.endDate).endOf('day').toDate();
    const channel= !req.query.channel ? "atm" : req.query.channel;
    var a = await dac.dac.getData.getRandom(start,end,channel);
    
    res.end(
        JSON.stringify({
            date: a.map(o=>o.date),
            doc_count: a.map(o=>o.count),
            amount:a.map(o=>o.amount)
        })
    );
});

router.use("/sample", require("./sample"));

module.exports = router;
