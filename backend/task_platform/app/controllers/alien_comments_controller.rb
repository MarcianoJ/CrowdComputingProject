class AlienCommentsController < ApplicationController
  before_action :set_alien_comment, only: %i[ show edit update destroy ]

  # GET /alien_comments or /alien_comments.json
  def index
    @alien_comments = AlienComment.all
  end

  # GET /alien_comments/1 or /alien_comments/1.json
  def show
  end

  # GET /alien_comments/new
  def new
    @alien_comment = AlienComment.new
  end

  # GET /alien_comments/1/edit
  def edit
  end

  # POST /alien_comments or /alien_comments.json
  def create
    @alien_comment = AlienComment.new(alien_comment_params)

    respond_to do |format|
      if @alien_comment.save
        format.html { redirect_to alien_comment_url(@alien_comment), notice: "Alien comment was successfully created." }
        format.json { render :show, status: :created, location: @alien_comment }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @alien_comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /alien_comments/1 or /alien_comments/1.json
  def update
    respond_to do |format|
      if @alien_comment.update(alien_comment_params)
        format.html { redirect_to alien_comment_url(@alien_comment), notice: "Alien comment was successfully updated." }
        format.json { render :show, status: :ok, location: @alien_comment }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @alien_comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /alien_comments/1 or /alien_comments/1.json
  def destroy
    @alien_comment.destroy

    respond_to do |format|
      format.html { redirect_to alien_comments_url, notice: "Alien comment was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_alien_comment
      @alien_comment = AlienComment.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def alien_comment_params
      params.require(:alien_comment).permit(:untranslated, :translated, :robot_response, :alien_story_id)
    end
end
