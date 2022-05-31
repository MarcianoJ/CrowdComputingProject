class DataPointsController < ApplicationController
  before_action :set_data_point, only: %i[ show edit update destroy ]

  # GET /data_points or /data_points.json
  def index
    @data_points = DataPoint.all
  end

  # GET /data_points/1 or /data_points/1.json
  def show
  end

  # GET /data_points/new
  def new
    @data_point = DataPoint.new
  end

  # GET /data_points/1/edit
  def edit
  end

  # POST /data_points or /data_points.json
  def create
    @data_point = DataPoint.new(data_point_params)

    respond_to do |format|
      if @data_point.save
        format.html { redirect_to data_point_url(@data_point), notice: "Data point was successfully created." }
        format.json { render :show, status: :created, location: @data_point }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @data_point.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /data_points/1 or /data_points/1.json
  def update
    respond_to do |format|
      if @data_point.update(data_point_params)
        format.html { redirect_to data_point_url(@data_point), notice: "Data point was successfully updated." }
        format.json { render :show, status: :ok, location: @data_point }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @data_point.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /data_points/1 or /data_points/1.json
  def destroy
    @data_point.destroy

    respond_to do |format|
      format.html { redirect_to data_points_url, notice: "Data point was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_data_point
      @data_point = DataPoint.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def data_point_params
      params.require(:data_point).permit(:input, :input2, :maskable_words, :custom_options, :dataset_id, :classification)
    end
end
