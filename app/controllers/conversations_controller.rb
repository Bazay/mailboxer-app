class ConversationsController < ApplicationController
  def index
  end

  def create_message
    conversation = Mailboxer::Conversation.find(params[:conversation_id])
    current_user.reply_to_conversation(conversation, params[:body])

    redirect_to root_path
  end
end
