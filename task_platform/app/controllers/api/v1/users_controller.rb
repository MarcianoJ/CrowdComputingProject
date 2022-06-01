class Api::V1::UsersController < Api::V1::ApplicationController
  # Input:
  # - (none)
  #
  # Output:
  # - List of workers
  def index
    render json: User.user.all.map{ |user| user.attributes.with_indifferent_access.except('encrypted_password') }, status: :ok
  end
end
