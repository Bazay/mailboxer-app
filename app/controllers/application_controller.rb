class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  protected

    def current_user
      @current_user ||= User.find_by_fuse_id(user_params[:fuse_id]) unless user_params.nil?
    end

    def authorized?
      permission_denied unless current_user && current_user.is_authorized?(user_params)
    end

    def authenticate
       permission_denied unless params[:authentication_token] == @authentication_token && !@authentication_token.nil?
    end

    def unprocessable
      render json: { valid: false, error: "Unprocessable" }, status: :unprocessable_entity
    end

    def permission_denied
      render json: { valid: false, error: "You are not authorized" }, status: :unauthorized
    end

    def not_found
      render json: { valid: false, error: "Not found" }, status: :not_found
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

    def get_authentication_token
      @authentication_token ||= SecureRandom.uuid.to_s
    end
end
