class Api::V1::SessionsController < Api::V1::ApplicationController
  skip_before_action :authenticate_with_token!

  # Input:
  # - email (anonymous to create anonymous user)
  # - password (optional if email=anonymous)
  #
  # Output:
  # - token (for correct input)
  # - errors (for incorrect input)
  def create
    lower_chars = ('a'..'z').to_a
    alphanumeric = (('a'..'z').to_a + ('A'..'Z').to_a + ('0'..'9').to_a).flatten
    generated_password = nil
    
    if params[:email] == 'anonymous'
      name = lower_chars.sample(20).join
      generated_password = alphanumeric.sample(20).to_a.join
      user = User.create!(email: "#{name}@example.com", password: generated_password, anonymous: true)
    else
      user = User.find_by(email: params[:email])
    end

    if user.present? && user.valid_password?(generated_password || params[:password])
      if user.token.blank?
        user.token = JwtService.generate_token(user.id)
        user.save!
      end

      render json: { token: user.token, name: user.name, email: user.email, anonymous: user.anonymous }, status: :ok
    else
      render json: { errors: ['Credentials are incorrect'] }, status: :not_found
    end
  end
end