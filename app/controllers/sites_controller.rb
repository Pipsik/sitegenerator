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
    @data = Site.create(site_params)
    @data.save
    respond_with(@data)
  end

	

  private

    def site_params
      params.require(:site).permit(:name, :description, :tags)
    end
end

