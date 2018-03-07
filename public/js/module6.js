$(document).ready(function(){
     $(".panel-footer").hide();
    $(".panel-heading span.icon_minim").on('click', function (e) {
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideUp();
            $this.addClass('panel-collapsed');
            $this.removeClass('glyphicon-minus').addClass('glyphicon-plus');
        } else {
            $this.parents('.panel').find('.panel-body').slideDown();
            $this.removeClass('panel-collapsed');
            $this.removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
    $(".panel-footer input.chat_input").on('focus', function (e) {
        var $this = $(this);
        if ($('#minim_chat_window').hasClass('panel-collapsed')) {
            $this.parents('.panel').find('.panel-body').slideDown();
            $('#minim_chat_window').removeClass('panel-collapsed');
            $('#minim_chat_window').removeClass('glyphicon-plus').addClass('glyphicon-minus');
        }
    });
    $("#new_chat").on('click', function (e) {
        var size = $(".chat-window:last-child").css("margin-left");
        size_total = parseInt(size) + 400;
        alert(size_total);
        var clone = $("#chat_window_1").clone().appendTo(".container");
        clone.css("margin-left", size_total);
    });
    $(".icon_close").on('click', function (e) {
        //$(this).parent().parent().parent().parent().remove();
        $("#chat_window_1").remove();
    });
    
    jQuery(function ($) {
        var socket = io.connect('/');
        var $messageForm = $('#message-box');
        var $messageBox = $('#message');
        var $chat = $('#chat');
    
        var chatOuter = $('#chatWrap');
        var chatInner = $('#chat');
    
        var $users = $('#users');
        var $nickForm = $('#setNick');
        var $nickError = $('#nickError');
        var $nickBox = $('#nickname');
        var title = 'anonymous';
       
    
        $('#message').on("submit", function () {
                console.log("clicked");
            });
    
    
        $nickForm.submit(function (e) {
            console.log("clicked");
            e.preventDefault();
            title = $nickBox.val();
            socket.emit('new user', $nickBox.val(), function (data) {
                if (data) {
                    $('#nickWrap').hide();
                    document.title = title;
                    $('#chatWindow').show();
                    $(".panel-footer").show();
                } else {
                    $nickError.html("Sorry, that nickname is already taken , try something else");
                    $('#nickWrap').show();
                    $('#chatWindow').hide();
                    $(".panel-footer").hide();
                }
            });
            $nickBox.val('');
        });
    
        // socket.on('usernames', function (data) {
        //     var html = '<ul>';
        //     for (i = 0; i < data.length; i++) {
        //         html += '<li><span>' + data[i] + '</span></li>';
        //     }
        //     html = html + '</ul>';
        //     $users.html(html);
        // });
    
    
    
        $messageForm.submit(function (e) {
            e.preventDefault();
            var min = new Date().getMinutes();
            var hrs = new Date().getHours();
            var time = hrs + ":" + min;
            socket.emit('send message', $messageBox.val(), function (data) {
                $chat.append("<div class='row msg_container base_sent'><div class='col-md-10 col-xs-10'><div class='messages msg_sent'><p>" + data.msg 
                + "</p><time datetime='" + time + "'>"+ data.nick + ", " + time + "</time></div></div><div class='col-md-2 col-xs-2 avatar'>"
                + "<img src='http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg' class='img-responsive'></div></div>");
            });
            $messageBox.val('');
        });
    
        socket.on('new message', function (data) {
            var min = new Date().getMinutes();
            var hrs = new Date().getHours();
            var time = hrs + ":" + min;
            console.log(data);
            if (data.nick === title) {
                $chat.append("<div class='row msg_container base_sent'>"
                + "<div class='col-md-10 col-xs-10'><div class='messages msg_sent'><p>" + data.msg 
                + "</p><time datetime='" + time + "'>"+ data.nick + ", " + time + "</time></div></div><div class='col-md-2 col-xs-2 avatar'>"
                + "<img src='http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg' class='img-responsive'></div></div>");
              
            } else {
                $chat.append("<div class='row msg_container base_recieve'><div class='col-md-2 col-xs-2 avatar'><img src='http://www.bitrebels.com/wp-content/uploads/2011/02/Original-Facebook-Geek-Profile-Avatar-1.jpg' class='img-responsive'>"
                + "</div><div class='col-md-10 col-xs-10'><div class='messages msg_recieve'><p>" + data.msg  + "</p><time datetime='" + time + "'>"+ data.nick + ", " + time 
                + "</time></div></div>");
            }
            scrollCorrect();
        });
    
    
    
        // socket.on('whisper', function (data) {
        //     $chat.append("<p align='left' class='whisper'><b>&nbsp;&nbsp;&nbsp;" + data.nick + " : </b>" + data.msg + "</p><br/>");
    
        // });
    
        // socket.on('private', function (data) {
        //     $chat.append("<p align='right' class='whisper'><b>" + title + "@" + data.nick + ": </b>" + data.msg + "&nbsp;&nbsp;</p><br/>");
    
        // });
    
    
        function scrollCorrect() {
            chatOuter.scrollTop(chatInner.outerHeight());
        }
    });
    
});

