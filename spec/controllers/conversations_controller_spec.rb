require "rails_helper"

RSpec.describe ConversationsController, :type => :controller do
  let(:user) { create :user, fuse_id: 1, email: 'user@example.com', company_id: 1, username: 'user' }
  let(:recipient) { create :user, fuse_id: 2, email: 'user2@example.com', company_id: 1, username: 'user2' }
  let(:non_existent_user) { { fuse_id: 200, email: 'non_existent@example.com', company_id: 1, username: 'non_existent'} }
  let(:message) { create :message, body: 'Hi there!', sender_id: user.id }
  let(:conversation) { Mailboxer::Conversation.last }
  let(:format) { :json }
  let(:params) { { format: format } }

  before{ user.send_message(recipient, message.body, message.subject).conversation }

  describe 'index' do
    before{ get :index, params }
    
    context 'authorized' do
      let(:params) { { user: recipient.attributes, format: format } }

      it 'success' do
        expect(response).to be_success
      end

      it 'renders conversations' do
        expect(JSON.parse(response.body)['conversations'][0]['id']).to eq conversation.id
      end
    end

    it 'unauthorized' do
      expect(response).not_to be_success
    end
  end

  describe 'create' do
    let(:conversation_params) { 
      { 
        conversation:
        { 
          recipients: "#{user.fuse_id},#{recipient.fuse_id}",
          subject: 'subject',
          body: 'hello'
        }
      }
    }

    before{ post :create, params.merge(conversation_params) }

    context 'when no user account' do
      let(:params) { { user: non_existent_user, format: format } }

      it 'creates a new user record' do
        expect(User.find_by_fuse_id(non_existent_user[:fuse_id])).not_to be_nil
      end

      it 'creates a new conversation' do
        binding.pry
        expect(JSON.parse(response.body)['id']).to eq Mailboxer::Conversation.order('created_at desc').first.id
      end

      it 'creates a new conversation with recipients' do
        expect(Mailboxer::Conversation.order('created_at desc').first.recipients.map(&:fuse_id).sort).to eq [user.fuse_id, 
          recipient.fuse_id, non_existent_user[:fuse_id]].sort
      end
    end
  end
end