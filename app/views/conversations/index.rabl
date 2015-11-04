collection @conversations
attributes :id, :title, :subject, :created_at

child(:last_message => :last_message) { attributes :body }
node(:unread) { |conversation| conversation.is_unread? @current_user }
node(:recipients) do |conversation| 
  c = conversation.recipients.reject{ |recipient| recipient == @current_user }.map{ |recipient| recipient.username }
  if c.size == 1
    c.join(', ')
  else
    conversation.subject
  end
end