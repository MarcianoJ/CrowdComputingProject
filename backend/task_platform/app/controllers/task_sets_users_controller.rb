class TaskSetsUsersController < ApplicationController
  before_action :set_task_sets_user, only: %i[ show edit update destroy ]

  # GET /task_sets_users or /task_sets_users.json
  def index
    @task_sets_users = TaskSetsUser.all
  end

  # GET /task_sets_users/1 or /task_sets_users/1.json
  def show
  end

  # GET /task_sets_users/new
  def new
    @task_sets_user = TaskSetsUser.new
  end

  # GET /task_sets_users/1/edit
  def edit
  end

  # POST /task_sets_users or /task_sets_users.json
  def create
    @task_sets_user = TaskSetsUser.new(task_sets_user_params)

    respond_to do |format|
      if @task_sets_user.save
        format.html { redirect_to task_sets_user_url(@task_sets_user), notice: "Task sets user was successfully created." }
        format.json { render :show, status: :created, location: @task_sets_user }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task_sets_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /task_sets_users/1 or /task_sets_users/1.json
  def update
    respond_to do |format|
      if @task_sets_user.update(task_sets_user_params)
        format.html { redirect_to task_sets_user_url(@task_sets_user), notice: "Task sets user was successfully updated." }
        format.json { render :show, status: :ok, location: @task_sets_user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @task_sets_user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /task_sets_users/1 or /task_sets_users/1.json
  def destroy
    @task_sets_user.destroy

    respond_to do |format|
      format.html { redirect_to task_sets_users_url, notice: "Task sets user was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_task_sets_user
      @task_sets_user = TaskSetsUser.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_sets_user_params
      params.require(:task_sets_user).permit(:task_set_id, :user_id)
    end
end
