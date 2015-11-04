# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  email      :string           default("")
#  username   :string           default("")
#  fuse_id    :integer
#  company_id :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ActiveRecord::Base
  acts_as_messageable

  def is_authorized? user_params
    # Add token authentication here...
    fuse_id == user_params['fuse_id'].to_i
  end

  def self.find_or_create_fuse_user fuse_user
    User.find_by_fuse_id(fuse_user['fuse_id']) || User.create(fuse_user) unless fuse_user.blank?
  end
end
