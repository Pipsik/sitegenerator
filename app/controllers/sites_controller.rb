class SitesController < InheritedResources::Base
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token

	def index
		@sites = Site.all
		 respond_to do |format|
      format.html
      format.json { render :json => @sites.to_json }
    end
	end

  def create
    @data = Site.new(site_params.merge(user_id: current_user.id))
    @data.save
    respond_with(@data)
  end

  def search_data
    @srchstr= Site.__elasticsearch__.search(params[:searchstr]).results.to_json
    render :json => @srchstr
  end

  private

    def site_params
      params.require(:site).permit(:name, :description, tags:[:text, :tag])
    end
end

