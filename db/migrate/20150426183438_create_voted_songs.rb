class CreateVotedSongs < ActiveRecord::Migration
  def change
    create_table :voted_songs do |t|
      t.references :guest, index: true
      t.references :song, index: true

      t.timestamps null: false
    end
    add_foreign_key :voted_songs, :guests
    add_foreign_key :voted_songs, :songs
  end
end
