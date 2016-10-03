class Ability
  include CanCan::Ability

  def initialize(user)
    user ||= User.new # guest user (not logged in)
      if user.role.admin?
        can :manage, :alls
      elsif user.role.user?
        can :create, [Site,Comment]
        can [:update, :destroy ], [Site, Comment], :user_id => user.id
      else
        can :read, :all
      end
  end
end