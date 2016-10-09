class PagesController < InheritedResources::Base
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token
  # before_action :authenticate_user!
  load_and_authorize_resource

  def index
    render json: Page.all
  end

  def create
    page = Page.where(:title => params[:title], :site_id => params[:site_id]).first_or_create do |page|
      page.site_id = params[:site_id]
      page.content = params[:content]
      page.title = params[:title]
    end
    page.update_attributes(:content => params[:content])
   render nothing: true
  end


  def show
    @page = Page.find_by(params[:site_id])
    render json: @page
  end


  private

  def page_params
    params.require(:page).permit(:title, :content)
  end

end