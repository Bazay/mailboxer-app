FactoryGirl.define do
  factory :user do
    company_id 1
    fuse_id nil
    sequence(:email) { |n| Faker::Internet.email }
    username { Faker::Internet.username }
  end
end