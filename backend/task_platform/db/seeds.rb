# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'json'

# User creation
admin = User.create!(name: 'Admin', email: 'admin@example.com', password: 'testtest', role: :admin)
workers = 10.times.map { |index| User.create!(name: 'Worker 1', email: "worker_#{index}@example.com", password: 'testtest', role: :user) }

# Task (type) creation
task_sentiment = Task.create!(name: 'Sentiment analysis', nlp_kind: :sentiment_analysis, multi_input: false)
task_entailment = Task.create!(name: 'Textual entailment', nlp_kind: :textual_entailment, multi_input: true)

# Task classification options creation
task_sentiment.classification_options.create!(name: 'positive')
task_sentiment.classification_options.create!(name: 'neutral')
task_sentiment.classification_options.create!(name: 'negative')

task_entailment.classification_options.create!(name: 'entails')
task_entailment.classification_options.create!(name: 'neutral')
task_entailment.classification_options.create!(name: 'contradicts')

# Gold standard dataset creation
gold_standard_dataset = Dataset.create!(name: 'Example gold standard dataset', gold_standard: true, task: task_sentiment)
gold_standard_dataset.data_points.create!(input: 'Great product, would buy again.', classification: 'positive', rationale_words: ['Great', 'would', 'buy'])
gold_standard_dataset.data_points.create!(input: 'Never again! This product ruined my life.', classification: 'negative', rationale_words: ['Never', 'ruined'])
gold_standard_dataset.data_points.create!(input: 'Meh.', classification: 'neutral', rationale_words: ['Meh'])

# Unlabeled dataset creation
unlabeled_dataset = Dataset.create!(name: 'Unlabeled dataset', gold_standard: false, task: task_sentiment)
file = File.open Rails.root + "app/assets/datasets/amazon-automotive-reviews/automotive_processed_min.json"
data = JSON.load file
file.close
data.each do |review|
  unlabeled_dataset.data_points.create!(input: review['reviewText'])
end

# Taskset creation
def create_taskset(name, task, dataset, n_data_points)
  taskset = TaskSet.create!(name: name, task: task)
  taskset.data_points = dataset.data_points.sample n_data_points
  return taskset
end

taskset1 = create_taskset("Sentiment analysis 001", task_sentiment, unlabeled_dataset, 10)
taskset2 = create_taskset("Sentiment analysis 002", task_sentiment, unlabeled_dataset, 10)
taskset3 = create_taskset("Sentiment analysis 003", task_sentiment, unlabeled_dataset, 10)

# Assign workers to taskset
taskset1.users = workers.select{ rand > 0.5 }

# Alien story creation
alien_story_1 = AlienStory.create!(name: "First contact")

alien_story_1.alien_comments.create!(
  untranslated: Devise.friendly_token(100),
  translated: "Hello little lifeforms, are you smart enough to communicate or can we just exploit you to mine salt from your sweat glands?",
  robot_response: "Hello far traveler, I am translation robot Bob and I speak on behalf of the humans. Their intelligence is worth a lot more than their sweat, I can assure you."
)

alien_story_1.alien_comments.create!(
  untranslated: Devise.friendly_token(100),
  translated: "Oh I see, I want to test you! Such intelligent creatures would certainly know the basic physics of teleporting, right?",
  robot_response: "Unfortunately, we're not there yet. However, we do know how to do surgery on a grape."
)

alien_story_1.alien_comments.create!(
  untranslated: Devise.friendly_token(100),
  translated: "What!? I am truly shocked. So much effort spent on such an insignificant thing. This must mean that your people don't have any challenges anymore. I want to express my gratitude and intense warmth to all of you by showering you with the rays of a thousand suns!!",
  robot_response: "WAIT! STOP! While I can handle it, the humans won't survive! How about showing your affection with a tenth of the sun?"
)

alien_story_1.alien_comments.create!(
  untranslated: Devise.friendly_token(100),
  translated: "Everything for my new squishy friends! Can I take a few home as a pet, to show to my friends and family?",
  robot_response: "Easy there! You barely know them. Maybe it's better to study them from a distance for a while."
)

alien_story_1.alien_comments.create!(
  untranslated: Devise.friendly_token(100),
  translated: "You're right. I am always a little too enthousiastic when meeting new lifeforms. You know what? I'll just teleport our galaxy here, then my family can see for themselves",
  robot_response: "That does not sound like a good idea. Wouldn't this cause MAJOR disruptions?"
)

alien_story_1.alien_comments.create!(
  untranslated: Devise.friendly_token(100),
  translated: "There is a wee bit of turbulence, but that's the fun part! You know, swapping stars and planets and moons, you never know what you're gonna get. Maybe a collision or two, but I'm 24% sure you will survive.",
  robot_response: "On Earth, we like to lean more on the safe side. So, we gladly decline your offer."
)

alien_story_1.alien_comments.create!(
  untranslated: Devise.friendly_token(100),
  translated: "You know, I have met many different lifeforms, but the worst ones are those that are INHOSPITABLE! HOW DARE YOU SHUN US!! YOU WILL REGRET THIS!!! WE DO NOT TAKE REJECTION LIGHTLY!!!!",
  robot_response: "I certainly did not mean to offend you. I wanted to suggest a smaller gathering first, to get to know your species and customs better. This would help avoid misunderstandings. Do you agree?"
)

alien_story_1.alien_comments.create!(
  untranslated: Devise.friendly_token(100),
  translated: "Well if you say so. Then I want to talk to your leader. Who is the head of your planet?",
  robot_response: "Well, that's hard to say. Technically, there isn't something as a global leader, really..."
)

puts "Database successfully seeded"