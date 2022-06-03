class TaskSetsController < ApplicationController
  before_action :set_task_set, only: %i[ show edit update destroy ]

  # GET /task_sets or /task_sets.json
  def index
    @task_sets = TaskSet.all
  end

  # GET /task_sets/1 or /task_sets/1.json
  def show
  end

  # GET /task_sets/new
  def new
    @task_set = TaskSet.new
  end

  # GET /task_sets/1/edit
  def edit
  end

  # POST /task_sets or /task_sets.json
  def create
    @task_set = TaskSet.new(task_set_params)

    respond_to do |format|
      if @task_set.save
        format.html { redirect_to task_set_url(@task_set), notice: "Task set was successfully created." }
        format.json { render :show, status: :created, location: @task_set }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /task_sets/1 or /task_sets/1.json
  def update
    respond_to do |format|
      if @task_set.update(task_set_params)
        format.html { redirect_to task_set_url(@task_set), notice: "Task set was successfully updated." }
        format.json { render :show, status: :ok, location: @task_set }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task_set.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /task_sets/1 or /task_sets/1.json
  def destroy
    @task_set.destroy

    respond_to do |format|
      format.html { redirect_to task_sets_url, notice: "Task set was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_set
      @task_set = TaskSet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_set_params
      params.require(:task_set).permit(:name, :tutorial, :task_id)
    end
end
