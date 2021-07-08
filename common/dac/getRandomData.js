const es = require("./helper/es");
const moment = require("moment");

/**
 * 
 * @param {Date} start 
 * @param {Date} end 
 */
exports.getRandom = async (start,end,channel) => {
    // var start =
    //     o.startDate != ""
    //         ? new Date(o.startDate)
    //         :new Date();
    // var end =
    //     o.endDate != ""
    //         ? new Date(o.endDate)
    //         : new Date(); //Verificar si se necesita Timezone

    var body = {
        size: 0,
        sort: [
            {
                date: {
                    order: "desc",
                },
            },
        ],
        query: {
            bool: {
                must: [
                    {
                        range: {
                            date: {
                                gte: start,
                                lt: end,
                            },
                        },
                    },
                ],
            },
        },
        aggs: {
            histograma: {
                date_histogram: {
                    field: "date",
                    interval: "30m",
                    time_zone: "America/Mexico_City",
                },aggs: {
                  amount: {
                    "sum": {
                      field: "amount"
                    }
                  }
                }
            },
        },
    };

    const res = await es.search({
        index: "trans-" + channel, //Verificar parametrizacion
        type: "_doc",
        body: body,
    });

    var hits = res.body.aggregations.histograma.buckets.map((o) => ({
        date: o.key,
        count: o.doc_count,
        amount:o.amount.value
    }));
    return hits;
};
