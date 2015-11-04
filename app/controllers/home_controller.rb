class HomeController < ApplicationController
  # before_filter :traffic_lights
  def index
    @conversation = Mailboxer::Conversation.first
  end

  private
    def traffic_lights
      redirect_to new_user_session_path unless current_user
    end
end
