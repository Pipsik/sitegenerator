require 'test_helper'

class AchivementsControllerTest < ActionController::TestCase
  setup do
    @achivement = achivements(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:achivements)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create achivement" do
    assert_difference('Achivement.count') do
      post :create, achivement: { description: @achivement.description, name: @achivement.name }
    end

    assert_redirected_to achivement_path(assigns(:achivement))
  end

  test "should show achivement" do
    get :show, id: @achivement
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @achivement
    assert_response :success
  end

  test "should update achivement" do
    patch :update, id: @achivement, achivement: { description: @achivement.description, name: @achivement.name }
    assert_redirected_to achivement_path(assigns(:achivement))
  end

  test "should destroy achivement" do
    assert_difference('Achivement.count', -1) do
      delete :destroy, id: @achivement
    end

    assert_redirected_to achivements_path
  end
end
