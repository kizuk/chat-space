$(function(){

 function buildHTML(message){
 	var html = `<div class="body__message-list">
                 <div class="body__messages">
                  <div class="body__messages-name">
                   ${message.user_name}
                  </div>
                  <div class="body__message-time">
                   ${message.created_at}
                  </div>
                  <div class="body__message-text">
                   <p class="body__message-text_content">
                    ${message.content}
                   </p>
                   <img src="${message.image.url}" class="lower-message__image"
                  </div>
                 </div>
                </div>`
    return html;
 }

  $('.new_message').on('submit', function(e){
    e.preventDefault();
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
      var html = buildHTML(data)
      $('.messages').append(html)
      $('.message__input').val('')
    })
  })
});
