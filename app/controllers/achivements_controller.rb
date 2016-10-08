class AchivementsController < InheritedResources::Base
  def achivement
    @user = User.find(params[:id])
    @user.sites.count
    @achivements = {site: {:count => @user.sites.count, :label => get_achivement_label_type(@user.sites.count) } }
    @achivements = @achivements.to_json
    render json: @achivements
  end

  def get_achivement_label_type(count)
    if (0..4).include?(count)
      return 'default'
    end
    if (4..100).include?(count)
      return 'primary'
    end
  end


  private
    def achivement_params
      params.require(:achivement).permit(:name, :description)
    end
end

