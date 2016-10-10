class ApplicationController < ActionController::Base
  before_action :set_locale
  protect_from_forgery with: :exception
  rescue_from CanCan::AccessDenied do |exception|
    render text: 'authError'
  end

  def set_locale
    I18n.default_locale = :ru
    I18n.locale = current_user.try(:locale) || I18n.default_locale
    unless params[:locale].nil?
      I18n.locale=params[:locale]
    end
  end
end
