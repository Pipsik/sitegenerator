class AchivementsController < InheritedResources::Base

  private

    def achivement_params
      params.require(:achivement).permit(:name, :description)
    end
end

