class ComentsController < InheritedResources::Base
  before_action :set_site, only: [:show]

  def create
    page = Page.find(params[:page_id])
    comment = page.comments.create(comment_params)
    respond_with post, comment
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end
end