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
#  avatar_url :string           default("")
#

FactoryGirl.define do
  factory :user do
    company_id 1
    fuse_id nil
    sequence(:email) { |n| Faker::Internet.email }
    username { Faker::Internet.username }
  end
end
