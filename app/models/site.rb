require 'elasticsearch/model'

class Site < ActiveRecord::Base
	include Elasticsearch::Model
	include Elasticsearch::Model::Callbacks

	serialize :tags, Array
	belongs_to :user
	has_many :pages


	index_name Rails.application.class.parent_name.underscore
	document_type self.name.downcase
end
