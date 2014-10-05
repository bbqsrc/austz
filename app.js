var tzs = [
    'Australia/Perth',
    'Australia/Darwin',
    'Australia/Adelaide',
    'Australia/Brisbane',
    'Australia/Sydney',
    'Australia/Melbourne',
    'Australia/Canberra',
    'Australia/Hobart'
];


var todayBtn = $("#todayBtn");
var date = $("#date");
var place = $("#place");

tzs.forEach(function(tz) {
    place.append($(document.createElement('option'))
            .attr('value', tz).text(tz));
});

$("#time").on('input', function() {
    var raw = date.val() + " " + $(this).val();
    var baseTz = place.val();
    var time = moment.tz(raw, baseTz);
    var output = $("#output").empty();

    if (!time.isValid()) {
        return;
    }

    tzs.forEach(function(tz) {
        var row = $(document.createElement('tr'));
        if (tz == baseTz) {
            row.css('background-color', 'rgba(255, 255, 0, 0.2)');
        }
        row.append("<th>" + tz.split('/')[1] + "</th>");
        row.append("<td>" + time.clone().tz(tz).format("h:mm a (D MMMM YYYY, HH:mm)") + "</td>");
        output.append(row);
    });
});

date.change(function() {
    $("#time").trigger('input');
});

place.change(function() {
    $("#time").trigger('input');
});

todayBtn.click(function() {
    $("#date").val(moment(new Date()).format("YYYY-MM-DD"));

    $("#time").trigger('input');
});
