class ClassificationOptionsController < ApplicationController
  before_action :set_classification_option, only: %i[ show edit update destroy ]

  # GET /classification_options or /classification_options.json
  def index
    @classification_options = ClassificationOption.all
  end

  # GET /classification_options/1 or /classification_options/1.json
  def show
  end

  # GET /classification_options/new
  def new
    @classification_option = ClassificationOption.new
  end

  # GET /classification_options/1/edit
  def edit
  end

  # POST /classification_options or /classification_options.json
  def create
    @classification_option = ClassificationOption.new(classification_option_params)

    respond_to do |format|
      if @classification_option.save
        format.html { redirect_to classification_option_url(@classification_option), notice: "Classification option was successfully created." }
        format.json { render :show, status: :created, location: @classification_option }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @classification_option.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /classification_options/1 or /classification_options/1.json
  def update
    respond_to do |format|
      if @classification_option.update(classification_option_params)
        format.html { redirect_to classification_option_url(@classification_option), notice: "Classification option was successfully updated." }
        format.json { render :show, status: :ok, location: @classification_option }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @classification_option.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /classification_options/1 or /classification_options/1.json
  def destroy
    @classification_option.destroy

    respond_to do |format|
      format.html { redirect_to classification_options_url, notice: "Classification option was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_classification_option
      @classification_option = ClassificationOption.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def classification_option_params
      params.require(:classification_option).permit(:name, :dataset_id)
    end
end
