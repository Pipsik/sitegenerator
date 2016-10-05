class PagesController < InheritedResources::Base
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token

  def index
    render json: Page.all
  end

  def create
   @page = Page.new(page_params.merge(siteId: params[:siteId]))
   @page.save
   render nothing: true
  end


  def show
    render json: Page.find(params[:id])
  end
  private

  def page_params
    params.require(:page).permit(:title, :content, :siteId)
  end
end