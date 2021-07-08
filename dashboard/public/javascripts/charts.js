var _charts = {};

function GetData() {

    $.ajax({
        method: "GET",
        url: "elasticData",
        dataType: "json",
        data: {
            startDate: $("#dateStart").val(),
            endDate: $("#dateEnd").val(),
            channel:$("#channel").val()
        },
        success: function (data) {
            TimelineChart(data),
            AmountChart(data)
        },

        function(a, b, c) {
            window.alert(a.responseText);
        },
    });
    return true;
}



function TimelineChart(data)
{

    var ctx = document.getElementById("myChart");

    if (_charts["chartTimeline"]) {
        _charts["chartTimeline"].data.labels=data.date;
        _charts[
            "chartTimeline"
        ].options.scales.xAxes[0].ticks.callback = function (value) {
            var format = "HH:mm" ;
            return moment(value).format(format);
        };
        
        _charts["chartTimeline"].data.datasets[0].data=data.doc_count;
        _charts[
            "chartTimeline"
        ].options.tooltips.callbacks.title = function (value) {
            return moment(value[0].xLabel).format("dd:HH:mm");
        };

        _charts["chartTimeline"].update();

    }
    else
    {

        _charts["chartTimeline"] = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.date,
                datasets: [
                    {
                        label: 'Tansaccciones',
                        data: data.doc_count,
                        borderWidth: 1,
                        borderColor: "#80cc80",
                        pointRadius: 0,
                        lineTension: 0,
                        lineWeight: 1,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                chartArea: {
                    backgroundColor: 'rgba(0, 0, 0,0.7)'
                },
                maintainAspectRatio: false,
                legend: {
                    display: true,
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                // labelString:"Seconds"
                            },
                            ticks: {
                                fontColor: "#ffffff",
                                beginAtZero: true,
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                callback: function (value) {
                                    return moment(value).format(
                                        "HH:mm"
                                    );
                                },
                                fontColor: "#ffffff",
                                fontSize: 13,
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 30,
                            },
                        },
                    ],
                },
            },
        });

    }
    
}

function AmountChart(data)
{
    var ctx = document.getElementById("myChart2");

    if (_charts["chartAmount"]) {
        _charts["chartAmount"].data.labels=data.date;
        _charts[
            "chartAmount"
        ].options.scales.xAxes[0].ticks.callback = function (value) {
            var format = "HH:mm" ;
            return moment(value).format(format);
        };
        _charts[
            "chartAmount"
        ].options.scales.yAxes[0].ticks.callback = function (
            value,
            _index,
            _values
        ) {
            return Math.floor(value)+"$";
        },
        _charts["chartAmount"].data.datasets[0].data=data.doc_count;

        _charts["chartAmount"].update();

    }
    else{

        _charts["chartAmount"] = new Chart(ctx, {
            type: "line",
            data: {
                labels: data.date,
                datasets: [
                    {
                        label: 'Flujo Monetario',
                        data: data.amount,
                        borderWidth: 1,
                        borderColor: "#80cc80",
                        pointRadius: 0,
                        lineTension: 0,
                        lineWeight: 1,
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: true,
                },
                scales: {
                    yAxes: [
                        {
                            scaleLabel: {
                                display: true,
                                // labelString:"Seconds"
                            },
                            ticks: {
                                fontColor: "#ffffff",
                                beginAtZero: true,
                                callback: function (
                                    value,
                                    _index,
                                    _values
                                ) {
                                    return Math.floor(value)+"$";
                                },
                            },
                        },
                    ],
                    xAxes: [
                        {
                            ticks: {
                                callback: function (value) {
                                    return moment(value).format(
                                        "HH:mm"
                                    );
                                },
                                fontColor: "#ffffff",
                                fontSize: 13,
                                maxRotation: 0,
                                autoSkip: true,
                                autoSkipPadding: 30,
                            },
                        },
                    ],
                },
            },
        });

    }
     
}


function setupRefresh() {
    // chartline1();
   
    refreshData();
    setInterval(refreshData, 10000);


    function refreshData() {
        
        GetData();
        // refreshCircle("widgetcircle1");
        // refreshCircle("widgetcircle2");
    }
}