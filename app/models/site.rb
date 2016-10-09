require 'elasticsearch/model'

class Site < ActiveRecord::Base
	validates :name, :description, :tags , :presence => true
	include Elasticsearch::Model
	include Elasticsearch::Model::Callbacks

	serialize :tags, Array
	belongs_to :user
	has_many :pages, dependent: :destroy
	has_many :comments



	index_name Rails.application.class.parent_name.underscore
	document_type self.name.downcase
end
