class PagesController < InheritedResources::Base
  protect_from_forgery with: :exception
  skip_before_filter  :verify_authenticity_token

  def index
    render json: Page.all
  end

  def create
    page = Page.new(page_params.merge(site_id: params[:site_id]))
    page.save
   render nothing: true
  end


  def show
    send = Page.find_by(params[:site_id])
    p send
    render json: send
  end
  private

  def page_params
    params.require(:page).permit(:title, :content, :site_id)
  end
end