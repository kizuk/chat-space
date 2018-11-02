$(function() {

 var user_result = $("#user-search-result");

 function appendUser(user) {
 	var html = `<div class="chat-group-user clearfix">
                 <p class="chat-group-user__name">${user.name}</p>
                 <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    user_result.append(html);
 }

 function appendNoUser(user) {
 	var html = ``
 	user_result.append(html);
 }


  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val()
    console.log(input)

    $.ajax( {
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $(".chat-group-user").remove();
      if (users.length !== 0) {
      	users.forEach(function(user) {
      	  appendUser(user);
      	});
      }
      else {
          appendNoUser('一致するユーザーはいませんでした');
      }
    })
    .fail(function(){
      alert('検索に失敗しました')
    })
  });
});
