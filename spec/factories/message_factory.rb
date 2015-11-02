FactoryGirl.define do
  factory :message, class: 'Mailboxer::Message' do
    subject 'none'
    body ''
    sender_id nil
    sender_type 'User'
  end
end