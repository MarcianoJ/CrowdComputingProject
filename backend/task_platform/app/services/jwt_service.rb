require 'jwt'

class JwtService
  def self.generate_token(user_id)
    payload = { application: 'task_platform', user_id: user_id }

    token = JWT.encode payload, hmac_secret, 'HS256'
  end

  def self.valid_token?(token, user)
    decoded_token = JWT.decode token, hmac_secret, true, { algorithm: 'HS256' }
    decoded_token = decoded_token.first.with_indifferent_access

    decoded_token[:application] == 'task_platform' &&
      decoded_token[:user_id].to_i == user&.id &&
      token == user&.token
  end

  def self.hmac_secret
    'temp_key_1'
  end
end
