class MessagesController < ApplicationController
  before_action :conversation

  respond_to :json

  def index
    # @conversations = current_user.mailbox.conversations
    # @notifications = current_user.mailbox.notifications.group_by &:sender_id
    # @receipts = current_user.mailbox.receipts
    # @message = current_user.mailbox.inbox.first.messages.first.body
    @conversation.mark_as_read current_user
    @messages = @conversation.messages
  end

  # GET /message/new
  def new
    @user = User.find(params[:user])
    @message = current_user.messages.new
  end

  # POST /message/create
  def create
    @conversation = current_user.mailbox.conversations.find(params[:conversation_id])
    @message = current_user.reply_to_conversation(@conversation, params[:body])
    render json: @message, success: true
  end

  private
    def conversation
      @conversation ||= current_user.mailbox.conversations.find(params[:conversation_id])
    end
end