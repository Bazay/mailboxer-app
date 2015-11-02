class CreateUsers < ActiveRecord::Migration
  def change
    create_table(:users) do |t|
      ## Database authenticatable
      t.string :email,              default: ""
      t.string :username,           default: ""
      t.integer :fuse_id,            default: nil
      t.integer :company_id,         default: nil

      t.timestamps null: false
    end

    add_index :users, :email,                unique: true
    add_index :users, :username,             unique: true
  end
end
