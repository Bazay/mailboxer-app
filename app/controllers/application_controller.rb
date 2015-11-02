class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  protected

    def current_user
      @current_user ||= User.find_or_create_fuse_user(user_params) unless user_params.nil?
    end

    def authorized?
      permission_denied unless current_user && current_user.is_authorized?(user_params)
    end

    def permission_denied
      render json: { valid: false, error: I18n.t("You are not authorized") }, status: :unauthorized
    end

    def user_params
      params.require(:user).permit(:username, :email, :fuse_id, :company_id)
    end

    def conversation_params(*args)
      conversation = params.require(:conversation).permit(:recipients, :body, :subject)
      conversation = conversation.values_at(*args) unless args.empty?
      conversation = conversation.first if args.length == 1
      conversation
    end
end
