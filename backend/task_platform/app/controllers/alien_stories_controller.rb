class AlienStoriesController < ApplicationController
  before_action :set_alien_story, only: %i[ show edit update destroy ]

  # GET /alien_stories or /alien_stories.json
  def index
    @alien_stories = AlienStory.all
  end

  # GET /alien_stories/1 or /alien_stories/1.json
  def show
  end

  # GET /alien_stories/new
  def new
    @alien_story = AlienStory.new
  end

  # GET /alien_stories/1/edit
  def edit
  end

  # POST /alien_stories or /alien_stories.json
  def create
    @alien_story = AlienStory.new(alien_story_params)

    respond_to do |format|
      if @alien_story.save
        format.html { redirect_to alien_story_url(@alien_story), notice: "Alien story was successfully created." }
        format.json { render :show, status: :created, location: @alien_story }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @alien_story.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /alien_stories/1 or /alien_stories/1.json
  def update
    respond_to do |format|
      if @alien_story.update(alien_story_params)
        format.html { redirect_to alien_story_url(@alien_story), notice: "Alien story was successfully updated." }
        format.json { render :show, status: :ok, location: @alien_story }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @alien_story.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /alien_stories/1 or /alien_stories/1.json
  def destroy
    @alien_story.destroy

    respond_to do |format|
      format.html { redirect_to alien_stories_url, notice: "Alien story was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_alien_story
      @alien_story = AlienStory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def alien_story_params
      params.require(:alien_story).permit(:name)
    end
end
