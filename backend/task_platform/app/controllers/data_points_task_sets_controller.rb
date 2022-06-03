class DataPointsTaskSetsController < ApplicationController
  before_action :set_data_points_task_set, only: %i[ show edit update destroy ]

  # GET /data_points_task_sets or /data_points_task_sets.json
  def index
    @data_points_task_sets = DataPointsTaskSet.all
  end

  # GET /data_points_task_sets/1 or /data_points_task_sets/1.json
  def show
  end

  # GET /data_points_task_sets/new
  def new
    @data_points_task_set = DataPointsTaskSet.new
  end

  # GET /data_points_task_sets/1/edit
  def edit
  end

  # POST /data_points_task_sets or /data_points_task_sets.json
  def create
    @data_points_task_set = DataPointsTaskSet.new(data_points_task_set_params)

    respond_to do |format|
      if @data_points_task_set.save
        format.html { redirect_to data_points_task_set_url(@data_points_task_set), notice: "Data points task set was successfully created." }
        format.json { render :show, status: :created, location: @data_points_task_set }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @data_points_task_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /data_points_task_sets/1 or /data_points_task_sets/1.json
  def update
    respond_to do |format|
      if @data_points_task_set.update(data_points_task_set_params)
        format.html { redirect_to data_points_task_set_url(@data_points_task_set), notice: "Data points task set was successfully updated." }
        format.json { render :show, status: :ok, location: @data_points_task_set }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @data_points_task_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /data_points_task_sets/1 or /data_points_task_sets/1.json
  def destroy
    @data_points_task_set.destroy

    respond_to do |format|
      format.html { redirect_to data_points_task_sets_url, notice: "Data points task set was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_data_points_task_set
      @data_points_task_set = DataPointsTaskSet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def data_points_task_set_params
      params.require(:data_points_task_set).permit(:data_point_id, :task_set_id)
    end
end
