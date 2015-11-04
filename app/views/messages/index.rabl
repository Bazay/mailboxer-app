collection @messages
attributes :id, :body, :conversation_id, :created_at, :sender_id, :subject, :updated_at

child(:sender => :sender) { attributes :id, :fuse_id, :username, :email, :company }
node(:conversation) { |message| message.conversation.attributes }
node(:conversation_recipients) { |message| message.conversation.recipients.reject{ |recipient| recipient == @current_user }.map{ |recipient| recipient.username }.join(', ') }