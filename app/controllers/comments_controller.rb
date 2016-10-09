class CommentsController < InheritedResources::Base
  skip_before_filter  :verify_authenticity_token
  # before_action :authenticate_user!
  load_and_authorize_resource

  def index
    @site = Site.find(params[:site_id])
    @site.comments
    render :json => @site.comments.to_json(:include => { :user => { :only => :username } })
  end


  def create
    @comment = Comment.new(comment_params.merge(user_id: current_user.id))
    if @comment.save
      render json: @comment.to_json(:include => { :user => { :only => :username } })
    else
      render json: {"error": comment.errors }
    end

  end


  private
  def comment_params
    params.require(:comment).permit(:body,:site_id, :user_id)
  end
end