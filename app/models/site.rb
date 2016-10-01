class Site < ActiveRecord::Base
	serialize :tags, Array
	belongs_to :user
	has_many :pages
end
