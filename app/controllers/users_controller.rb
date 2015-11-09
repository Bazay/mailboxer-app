class UsersController < ApplicationController
  helper_method :mailbox, :conversation
  before_action :mailbox, :rabl_current_user

  respond_to :json

  def create
    @user = User.new(user_params)
    if @user.save!
      render json: @user, success: true
    else
      unprocessable
    end
  end

  def index

  end

  def show
  end

  def new
    @authentication_token = get_authentication_token
    render json: { token: @authentication_token }
  end

  private

end