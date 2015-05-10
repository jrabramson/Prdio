# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150510063724) do

  create_table "delayed_jobs", force: :cascade do |t|
    t.integer  "priority",   default: 0, null: false
    t.integer  "attempts",   default: 0, null: false
    t.text     "handler",                null: false
    t.text     "last_error"
    t.datetime "run_at"
    t.datetime "locked_at"
    t.datetime "failed_at"
    t.string   "locked_by"
    t.string   "queue"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "delayed_jobs", ["priority", "run_at"], name: "delayed_jobs_priority"

  create_table "guests", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "host_id"
  end

  add_index "guests", ["host_id"], name: "index_guests_on_host_id"

  create_table "hosts", force: :cascade do |t|
    t.string   "key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "room"
    t.string   "username"
    t.string   "at"
    t.string   "ats"
  end

  create_table "playlists", force: :cascade do |t|
    t.string   "key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "host_id"
    t.string   "name"
  end

  add_index "playlists", ["host_id"], name: "index_playlists_on_host_id"

  create_table "songs", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "title"
    t.string   "artist"
    t.integer  "vote",         default: 0
    t.string   "suggested_by"
    t.string   "key"
    t.integer  "playlist_id"
    t.string   "image"
  end

  add_index "songs", ["playlist_id"], name: "index_songs_on_playlist_id"

  create_table "voted_songs", force: :cascade do |t|
    t.integer  "guest_id"
    t.integer  "song_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "voted_songs", ["guest_id"], name: "index_voted_songs_on_guest_id"
  add_index "voted_songs", ["song_id"], name: "index_voted_songs_on_song_id"

end
