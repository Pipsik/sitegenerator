class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
      if user.role.admin?
        can :manage, :all
      elsif user.role.user?
        can [:create, :show, :index, :pages, :user_sites, :mark], [Site, Comment, Page]
        can [:search_data], [Site]
        can [:pages,:edit,:destroy], [Site, Comment], :user_id => user.id
      else
        can :read, :all
        can [:search_data], [Site]
        can [:user_sites], [Site]
      end
  end
end
