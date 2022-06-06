class Api::V1::UsersController < Api::V1::ApplicationController
  skip_before_action :authenticate_with_token!, only: :create

  # Input:
  # - (none)
  #
  # Output:
  # - List of workers
  def index
    render json: User.user.all.map{ |user| user.public_attributes }, status: :ok
  end

  # Input:
  # - email
  # - password
  # - name
  #
  # Output:
  # - message (for success)
  # - errors (for failure)
  def create
    user = User.new(user_params)

    if user.save
      user.token = JwtService.generate_token(user.id)

      render json: { message: 'User created successfully', token: user.token }.merge(user.public_attributes), status: :ok
    else
      render json: { errors: user.errors.messages }, status: :unprocessable_entity
    end
  end

  protected

  def user_params
    params.permit(
      :email,
      :password,
      :name
    )
  end
end
