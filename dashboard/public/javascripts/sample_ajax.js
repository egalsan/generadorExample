function setupPage() {
    $("#send").on("click", function () {
        $.ajax({
            method: "POST",
            success: function (data) {
                alert(data.message);
            },
            error: function (_a, _b, _c) {
                debugger;
            }
        });
    });
}
