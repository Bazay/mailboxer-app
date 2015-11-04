class ConversationsController < ApplicationController
  before_filter :authorized?
  helper_method :mailbox, :conversation

  before_action :mailbox, :rabl_current_user

  respond_to :json

  def create
    recipient_fuse_ids = conversation_params(:recipients).split(',')
    recipients = User.where(fuse_id: recipient_fuse_ids).all

    if conversation = current_user.send_message(recipients, *conversation_params(:body, :subject)).conversation
      render json: conversation, status: :created, location: conversation
    else
      render json: conversation.errors, status: :unprocessable_entity
    end
  end

  def index
    @conversations ||= @mailbox.conversations
    # @conversationscount ||= current_user.mailbox.count
    # @trash ||= current_user.mailbox.trash.all
  end


  def reply
    current_user.reply_to_conversation(conversation, params[:body])
    redirect_to conversation_path(@conversation)
  end

  def trash
    conversation.move_to_trash(current_user)
    redirect_to :conversations
  end

  def show
    @conversation ||= @mailbox.conversations.find(params[:id])
    conversation.mark_as_read(current_user)

    render json: { conversation: @conversation }
  end

  def untrash
    conversation.untrash(current_user)
    redirect_to :back
  end

   def trashbin
    @conversations ||= @mailbox
    @conversationscount ||= current_user.mailbox.all
    @trash ||=  current_user.mailbox.trash
    @trashcount ||= @mailbox.trash.all
  end

  def empty_trash
    current_user.mailbox.trash.each do |conversation|
      conversation.receipts_for(current_user).update_all(:deleted => true)
    end
   redirect_to :conversations
  end

  private

  def mailbox
    @mailbox ||= current_user.mailbox
  end

  def rabl_current_user
    @current_user = current_user
  end

  def conversation
    @conversation ||= mailbox.conversations.find(params[:id])
  end
end