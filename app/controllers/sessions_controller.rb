class SessionsController < ApplicationController

  respond_to :json

  def create
    @user = User.find_or_create_fuse_user(user_params)
    if @user
      render json: @user, success: true
    else
      render json: { valid: false, error: @user.errors }, status: :unprocessable_entity
    end
  end

  def new
    @user = User.find_by_fuse_id(user_params['fuse_id'])
    if @user
      render json: {user: @user}, success: true
    else
      not_found
    end
  end
end