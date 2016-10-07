class PagesController < InheritedResources::Base
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token

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
    p page
   render nothing: true
  end


  def show
    @send = Page.find_by(params[:site_id])
    @comments = @send.comments
    render :json => {:page => @send, :comments => @comments}
  end
  #
  # def comments
  #   @page = Site.find(params[:id])
  #   @pages = @site.pages
  #   render json: @pages
  # end

  private

  def page_params
    params.require(:page).permit(:title, :content, :site_id)
  end

end