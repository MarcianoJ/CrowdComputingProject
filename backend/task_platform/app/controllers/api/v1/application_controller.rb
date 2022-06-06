class Api::V1::ApplicationController < ApplicationController
  protect_from_forgery with: :null_session

  before_action :authenticate_with_token!

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from StandardError, with: :render_generic_error_response

  def authenticate_with_token!
    user = nil

    if params[:token].present?
      user = User.user.find_by(token: params[:token])
    end

    if user.present? && JwtService.valid_token?(params[:token], user)
      sign_in user
    else
      raise 'User auth from token failed'
    end
  end

  def render_unprocessable_entity_response(exception)
    render json:  { errors: exception.record.errors }, status: :unprocessable_entity
  end

  def render_not_found_response(exception)
    render json: { errors: [exception.message] }, status: :not_found
  end

  def render_generic_error_response(exception)
    puts "Exception: #{exception.message}"
    puts "Stacktrace: #{exception.backtrace.join("\n").to_s}"

    render json: { errors: ["An exception has occurred: #{exception.message}"] }, status: :unprocessable_entity
  end
end