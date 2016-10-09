class SitesController < InheritedResources::Base
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token
  # before_action :authenticate_user!
  load_and_authorize_resource

	def index
		@sites = Site.all
		 respond_to do |format|
      format.html
      format.json { render :json => @sites.to_json(:include => { :user => { :only => :username } }) }
    end
	end

  def show
    @site = Site.find(params[:id])
    render :json => @site.to_json
  end

  def create
    @site = Site.new(site_params.merge(user_id: current_user.id))
    @site.save
    render json: @site
  end

  def search_data
    @srchstr= Site.__elasticsearch__.search(params[:searchstr][:text]).results.to_json
    render json: @srchstr
  end

  def pages
      @site = Site.find(params[:id])
      @pages = @site.pages
      render json: @pages
  end

  def update_pages
    @site = Site.find(params[:id])
    @pages = @site.pages
    render json: @pages
  end

  def user_sites
    @user = User.find(params[:id])
    p @user
    p @sites
    render json: @user.sites
  end

  def destroy
      @site = Site.find(params[:id])
      @site.destroy
      render json: @site
  end



  private

    def site_params
      params.require(:site).permit(:name, :description, tags:[:text, :tag])
    end
end

