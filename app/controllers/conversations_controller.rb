class ConversationsController < ApplicationController
  before_action :mailbox, :conversations

  respond_to :json

  def index
  end

  def create
    recipients = parse_users(conversation_params[:recipients])

    if conversation = current_user.send_message(recipients, *conversation_params(:body, :subject)).conversation
      render json: conversation, status: :created
    else
      render json: conversation.errors, status: :unprocessable_entity
    end
  end

  def show
    @conversation = @conversations.find(conversation_params[:id])
    conversation.mark_as_read(current_user)
  end

  def destroy
    @conversation = @conversations.find(conversation_params[:id])
    @conversation.move_to_trash(current_user)

    redirect_to :index
  end

  def reply
    @conversation = @conversations.find(conversation_params[:id])
    current_user.reply_to_conversation(@conversation, params[:body])
    redirect_to :show
  end

  def add_participant
    @conversation = @conversations.find(conversation_params[:id])
    @conversation.add_participant(participants)
    redirect_to :show
  end

  private

  def mailbox
    @mailbox ||= current_user.mailbox
  end

  def conversations
    @conversations = @mailbox.conversations
  end

  def parse_users(users)
    return User.where(id: users.split(',')).all
  end
end