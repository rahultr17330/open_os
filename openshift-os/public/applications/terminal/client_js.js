var i = 1;
var commands = [];
var commands_index = 0;
var color_library = ['#06f3b5', '#e91e63', '#00bcd4', '#cecccc'];
var socket = io();
socket.on('shell_exec_response', function (data) {
    $("#exec").append('<p>')
    data = data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

    for (i = 0; i < data.length; i++) {

        if (data[i] != '\n') {
            $("#exec").append(data[i])
        } else if (data[i] == '\n') {
            $("#exec").append('<br>')
        } else {
            $("#exec").append(' ')
        }
    }


    $("#loader").hide(10, function () {
        $("#input_line").show();
    });
});
$('#input_line').on('keydown', function (e) {
    var times = 0;
    var script = $(this).val().replace('$', '').replace('>', '').replace(" ", '');
    if (e.which == 38) {
        times++;

        $(this).val(">$ " + commands[commands_index - times]);

    } else if (e.which == 13) {
        e.preventDefault();
        commands[commands_index] = script;
        commands_index++;
        if (script == "clear") {
            $("#exec").html("");
            $(this).val(">$ ");
            i = 1;
        } else {
            $(this).val(">$ ");

            $("#input_line").hide(10, function () {
                $("#loader").show();

                var random = Math.floor(Math.random() * 1000);
                socket.emit('shell_exec', {
                    sc: script,
                    id: random
                });
                $("#exec").append('<p>' + i + '.<font color="#ff071a">> $ </font>' + script + '<br><output id=' + random + '></output></p>');
                i++;
                socket.on('shell_exec_response_' + random, function (data) {

                    if (script.substring(0, 3) == 'top') {
                        $("#" + random).html('');

                        $("#" + random).css('color', '#10de52');
                    } else {
                        var color = Math.floor(Math.random() * (4));
                        console.log(color);
                        $("#" + random).css('color', color_library[color]);
                    }
                    data = data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

                    for (i = 0; i < data.length; i++) {

                        if (data[i] != '\n') {
                            $("#" + random).append(data[i])
                        } else if (data[i] == '\n') {
                            $("#" + random).append('<br>')
                        } else {
                            $("#" + random).append(' ')
                        }
                    }


                    $("#loader").hide(10, function () {
                        $("#input_line").show();
                    });
                });
            });
        }
    }
    /*
    else */
});
$('#input_line_big').on('keydown', function (e) {
    var script = $(this).val().replace('$', '').replace('>', '').replace(" ", '');
    if (e.which == 13) {
        e.preventDefault();
        commands[commands_index] = JSON.stringify(script);
        commands_index++
        if (script == "clear") {
            $("#exec_big").html("");
            $(this).val(">$ ");
            i = 1;
        } else {
            $(this).val(">$ ");

            $("#input_line_big").hide(10, function () {
                $("#loader_big").show();

                var random = Math.floor(Math.random() * 1000);
                socket.emit('shell_exec', {
                    sc: script,
                    id: random
                });
                $("#exec_big").append('<p>' + i + '.<font color="#ff071a">> $ </font> ' + script + '<br><output id=' + random + '></output></p>');
                i++;
                socket.on('shell_exec_response_' + random, function (data) {

                    if (script.substring(0, 3) == 'top') {
                        $("#" + random).html('');

                        $("#" + random).css('color', '#10de52');
                    } else {
                        var color = Math.floor(Math.random() * (4));
                        console.log(color);
                        $("#" + random).css('color', color_library[color]);
                    }
                    data = data.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');

                    for (i = 0; i < data.length; i++) {

                        if (data[i] != '\n') {
                            $("#" + random).append(data[i])
                        } else if (data[i] == '\n') {
                            $("#" + random).append('<br>')
                        } else {
                            $("#" + random).append(' ')
                        }
                    }


                    $("#loader_big").hide(10, function () {
                        $("#input_line_big").show();
                    });
                });
            });
        }
    }
});