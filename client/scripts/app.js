var chatRoom = function() {
  this.username;
};

chatRoom.prototype.getMessages = function() {
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'GET',
    data: {order: '-createdAt', limit: 50},
    contentType: 'application/json',
    success: function (data) {
      // console.log("Request for data SUCCESSFUL");
      // console.log(data);
      var messages = data.results;

      $('#messages').empty();

      for (var i = 0; i < messages.length; i++) {
        var message = messages[i];
        var text = chatRoom.prototype.htmlEscape(message.text);
        var user = chatRoom.prototype.htmlEscape(message.username);
        var time = chatRoom.prototype.htmlEscape(message.createdAt);
        var room = chatRoom.prototype.htmlEscape(message.roomname);

        var $message = $('<div>' +
          '<p>' + user +'</p>' +
          '<p>' + text +'</p>' +
          '<p>' + time +'</p>' +
          '<p>' + room +'</p>' +
          '</div>');

        $('#messages').append($message);
      }
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Request for data FAILED');
    }
  });
};

chatRoom.prototype.htmlEscape = function(str) {
  return String(str)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
};

chatRoom.prototype.formatMessage = function(message){

  var formattedMessage = {
  'username':  this.username,
  'text':  message,
  'roomname': 'door'
  };
  this.postMessage(formattedMessage);
};

chatRoom.prototype.postMessage = function(message){
  $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
  });
};



$(document).ready(function(){

  var chatterbox = new chatRoom;
  chatterbox.getMessages();


  // setInterval(chatterbox.getMessages, 3000);
  $("button").on("click", function(){
    chatterbox.getMessages();
  });

$("#user_name").on("focusout",function(e){
  e.preventDefault();
  chatterbox.username = $("#user_name").val();

});

$("#new_message").keypress(function(e){
  if (e.which === 13 || e.keycode === 13){
    e.preventDefault();
    var newMessage = $("#new_message").val();
    $("#new_message").val("");
    chatterbox.formatMessage(newMessage);
    chatterbox.getMessages();

  }
});

//////////////////USERNAME


//////////////////POST

//////////////////POST



});
