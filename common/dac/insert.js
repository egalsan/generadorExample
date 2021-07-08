/** @module */

const es = require("./helper/es");

exports.save = async (o) => {
    await es.index({
        index: o.meta.index + "-" + o.meta.channel.toLowerCase(),
        type: "_doc",
        body: o.data,
    });
};

exports.delete = async (o) => {
    await es.delete_by_query({
        index: o.meta.index + "-" + o.meta.channel.toLowerCase(),
        type: "_doc",
        body: {
            max_docs: o.size,
            query: {
                bool: {
                    must: [
                        {
                            range: {
                                date: {
                                    gte: o.data.startDate,
                                    lte: o.data.endDate,
                                    time_zone: "America/Mexico_City",
                                },
                            },
                        },
                    ],
                },
            },
        },
    });
};

exports.count = async (o) => {
    var body = {
        query: {
            bool: {
                must: [
                    {
                        range: {
                            date: {
                                gte: o.data.startDate,
                                lte: o.data.endDate,
                                time_zone: "America/Mexico_City",
                            },
                        },
                    },
                ],
            },
        },
    };
    var res = await es.count({
        index: o.meta.index + "-" + o.meta.channel,
        type: "_doc",
        body: body
    });
    return res.body.count;
};
