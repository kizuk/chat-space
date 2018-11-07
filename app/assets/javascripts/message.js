$(function(){

 function buildHTML(message){
  if(message.image.url){
    var image = `<img src="${message.image.url}" class="lower-message__image">`
  }else{
    var image = ""
  }
 	var html = `<div class="body__messages-list" data-message-id="${message.id}">
                 <div class="body__messages">
                  <div class="body__messages-name">
                   ${message.user_name}
                  </div>
                  <div class="body__messages-time">
                   ${message.created_at}
                  </div>
                  <div class="body__messages-text">
                   <p class="body__message-text__content">
                     ${message.content}
                   </p>
                   ${image}
                  </div>
                 </div>
                </div>`
    return html;
 }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
    $(".body").animate({'scrollTop': $(".body")[0].scrollHeight}, 'fast');
    var formData = new FormData(this);
    var url = $(this).attr('action')
     $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
     })
     .done(function(data){
      console.log(data)
      var html = buildHTML(data);
       $('.body').append(html)
       $('.message__input').val("");
     })
     .fail(function(){
      alert('error');
     })
  })

  var update = setInterval(function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)) {
    var message_id = $(".body__messages-list:last").data('message-id');
    $.ajax({
      url: location.href,
      dataType: 'json',
      type: "GET",
      data: {
        message: { id: message_id}
      },
    })
    .done(function(data) {
      console.log(data)
      var makeHTML = '';
      $.each(data, function(i, data) {
      makeHTML += buildHTML(data);
      });
      $('.body').append(makeHTML);
    })
    .fail(function(data) {
      alert('自動更新に失敗しました');
    });
  } else {
    clearInterval(update);
   }} , 5000 );
});
