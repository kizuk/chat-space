if @new_message.present?
 json.array! @messages.each do |message|
   json.user_name  message.user.name
   json.created_at message.created_at.to_formatted_s(:ja)
   json.content    message.content
   json.image      message.image
   json.id         message.id
 end
end
