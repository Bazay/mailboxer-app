# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
3.times do |i| 
  User.create username: "user#{i+1}", email: "user#{i+1}@example.com", fuse_id: i+1, company_id: 1
end

conversation = Mailboxer::Conversation.create subject: 'Main Conversation'

User.all.each do |user|
  conversation.add_participant user
end

system = User.create email: 'system@example.com', username: 'System', fuse_id: User.count + 1, company_id: nil
conversation.messages.create body: 'Welcome to the site! Type a message below...', sender_id: system.id, sender_type: 'User', subject: 'nothing'
