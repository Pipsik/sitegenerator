class AchivementsController < InheritedResources::Base
  def achivement
    @achivements = {site: {:count => sites_count, :label => get_achivement_label_type(sites_count) },
                    comment: {:count => comments_count, :label =>get_achivement_label_type(comments_count)} }
    render json: @achivements.to_json
  end

  def sites_count
    @user = User.find(params[:id])
    @user.sites.count
  end

  def comments_count
    @user = User.find(params[:id])
    @user.comments.count
  end

  def get_achivement_label_type(count)
    if (0..2).include?(count)
      return 'default'
    end
    if (2..4).include?(count)
      return 'primary'
    end
  end


  private
    def achivement_params
      params.require(:achivement).permit(:name, :description)
    end
end

