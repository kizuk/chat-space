$(function() {

 var user_result = $("#user-search-result");

 function appendUser(user) {
 	var html = `<div class="chat-group-user clearfix chat-group-parent">
                 <p class="chat-group-user__name add_name">${user.name}</p>
                 <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    user_result.append(html);
 }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val()


    $.ajax( {
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $(".chat-group-parent").remove();
      if (users.length !== 0) {
      	users.forEach(function(user) {
      	appendUser(user);
      	});
      }
    })
    .fail(function(){
       alert('検索に失敗しました')
    })
  });

  function addUser(name,id){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                <input name='group[user_ids][]' type='hidden' value="${id}">
                <p class='chat-group-user__name'>${name}</p>
                <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $('#chat-group-users').append(html);
  }


 $('#user-search-result').on("click",".user-search-add", function() {
   var add_name = $(this).attr('data-user-name');
   var add_id = $(this).attr('data-user-id');
   addUser(add_name, add_id)
   var remove_user = $(this).parent();
   remove_user.remove();
 });

 $('#chat-group-users').on("click",".user-search-remove", function() {
   var remove_user = $(this).parent();
   remove_user.remove();
 })



});
