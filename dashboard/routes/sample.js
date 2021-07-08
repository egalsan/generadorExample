var express = require("express");
var router = express.Router();

router.get("/ajax", (_req, res) => {
    res.render("sample/ajax");
});

router.post("/ajax", (_req, res) => {
    res.json({ message: "Hello" });
});

/* GET users listing. */
router.get("/table", function (_req, res, _next) {
    const data = getData();
    res.render("sample/table", { data });
});

function getData() {
    const w = [
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
        "donec",
        "sed",
        "neque",
        "sem",
        "nunc",
        "vehicula",
        "sapien",
        "ut",
        "tortor",
        "tincidunt",
        "eget",
        "maximus",
        "nibh",
        "gravida",
        "phasellus",
        "egestas",
        "erat",
        "vel",
        "dictum",
        "placerat",
        "mi",
        "leo",
        "tempus",
        "dolor",
        "porta",
        "egestas",
        "arcu",
        "nibh",
        "varius",
        "urna",
        "pellentesque",
        "diam",
        "lectus",
        "iaculis",
        "a",
        "odio",
        "nec",
        "sagittis",
        "vehicula",
        "turpis",
        "quisque",
        "interdum",
        "lectus",
        "ex",
        "donec",
        "eget",
        "lacinia",
        "odio",
        "class",
        "aptent",
        "taciti",
        "sociosqu",
        "ad",
        "litora",
        "torquent",
        "per",
        "conubia",
        "nostra",
        "per",
        "inceptos",
        "himenaeos",
        "lorem",
        "ipsum",
        "dolor",
        "sit",
        "amet",
        "consectetur",
        "adipiscing",
        "elit",
        "vestibulum",
        "imperdiet",
        "at",
        "magna",
        "at",
        "sodales",
        "suspendisse",
        "nec",
        "mattis",
        "magna",
        "pellentesque",
        "efficitur",
        "metus",
        "urna",
        "in",
        "ultricies",
        "ipsum",
        "condimentum",
        "non",
        "aliquam",
        "sollicitudin",
        "sapien",
        "nec",
        "viverra",
        "placerat",
        "sapien",
        "tortor",
        "feugiat",
        "nisl",
        "a",
        "ultrices",
        "purus",
        "leo",
        "a",
        "erat",
        "curabitur",
        "consectetur",
        "pellentesque",
        "libero",
        "vel",
        "tempus",
        "aliquam",
        "id",
        "dictum",
        "odio"
    ];
    return Array(1000)
        .fill(0)
        .map(_o => ({
            a: Array(4)
                .fill(0)
                .map(_o => w[Math.floor(Math.random() * w.length)])
                .join(" "),
            b: Math.random() * 1000,
            c: Math.ceil(Math.random() * 100),
            d: new Date(new Date().valueOf() - Math.random() * 365 * 24 * 60 * 60 * 1000)
        }));
}

module.exports = router;
