class HomeController < ApplicationController
  before_filter :traffic_lights
  def index
    @conversation = Mailboxer::Conversation.first
    # system = User.find_by_email 'system@example.com'
    # @conversation.messages.create body: 'Welcome to the site! Type a message below...', sender_id: system.id, sender_type: 'User', subject: 'nothing'
  end

  private
    def traffic_lights
      redirect_to new_user_session_path unless current_user
    end
end
