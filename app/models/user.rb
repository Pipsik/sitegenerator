class User < ActiveRecord::Base
  extend Enumerize
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_and_belongs_to_many :achivements
  has_many :sites
  has_many :comments

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :omniauthable
  enumerize :role, in: [:user, :admin, :guest], default: :guest

  def self.find_for_facebook_oauth access_token
    user = User.where(:email => access_token.info.email).first_or_create do |user|
       user.provider=access_token.provider
       user.username=access_token.extra.raw_info.name
       user.email=access_token.extra.raw_info.email
       user.image =access_token.info.image
       user.role = 'user'
       user.password=Devise.friendly_token[0,20]
    end
  end

  def self.find_for_vkontakte_oauth access_token
    user = User.where(:email => access_token.info.email).first_or_create do |user|
       user.provider=access_token.provider
       user.username=access_token.info.name
       user.email=access_token.info.email
       user.image =access_token.info.image
       user.role = 'user'
       user.password=Devise.friendly_token[0,20]
    end
  end

  def self.find_for_twitter_oauth access_token
    user = User.where(:email => access_token.info.email).first_or_create do |user|
       user.provider=access_token.provider
       user.username=access_token.info.name
       user.email=access_token.info.email
       user.image =access_token.info.image
       user.role = 'user'
       user.password=Devise.friendly_token[0,20]
    end
  end

end
