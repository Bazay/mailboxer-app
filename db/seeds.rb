# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
3.times do |i| 
  User.create username: "user#{i+1}", email: "user#{i+1}@example.com", password: "password", password_confirmation: "password"
end

conversation = Mailboxer::Conversation.create subject: 'Main Conversation'

User.all.each do |user|
  conversation.add_participant user
end

system = User.create email: 'system@example.com', username: 'System', password: 'systempassword', password_confirmation: 'systempassword'

conversation.messages.create body: 'Welcome to the site! Type a message below...', sender_id: system.id, sender_type: 'User', subject: 'no_subject'
