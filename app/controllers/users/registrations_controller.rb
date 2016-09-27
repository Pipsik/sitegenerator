class Users::RegistrationsController < Devise::RegistrationsController
  # my custom fields are :name, :heard_how
  private

  def sign_up_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation,:provider)
  end
end