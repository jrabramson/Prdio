class VotedSong < ActiveRecord::Base
  belongs_to :guest
  belongs_to :song
end
