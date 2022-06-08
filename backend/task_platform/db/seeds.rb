# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


admin = User.create!(name: 'Admin', email: 'admin@example.com', password: 'testtest', role: :admin)
workers = 10.times.map { |index| User.create!(name: 'Worker 1', email: "worker_#{index}@example.com", password: 'testtest', role: :user) }

task_1 = Task.create!(name: 'Sentiment analysis', nlp_kind: :sentiment_analysis, multi_input: false)

task_1.classification_options.create!(name: 'positive')
task_1.classification_options.create!(name: 'neutral')
task_1.classification_options.create!(name: 'negative')

task_2 = Task.create!(name: 'Textual entailment', nlp_kind: :textual_entailment, multi_input: true)

task_2.classification_options.create!(name: 'entails')
task_2.classification_options.create!(name: 'neutral')
task_2.classification_options.create!(name: 'contradicts')

gold_standard_dataset = Dataset.create!(name: 'Example gold standard dataset', gold_standard: true, task: task_1)

gold_standard_dataset.data_points.create!(input: 'Great product, would buy again.', classification: 'positive', rationale_words: ['Great', 'would', 'buy'])
gold_standard_dataset.data_points.create!(input: 'Never again! This product ruined my life.', classification: 'negative', rationale_words: ['Never', 'ruined'])
gold_standard_dataset.data_points.create!(input: 'Meh.', classification: 'neutral', rationale_words: ['Meh'])

unlabeled_dataset = Dataset.create!(name: 'Example dataset', gold_standard: false, task: task_1)

data_points_for_task_set_1 = []
data_points_for_task_set_2 = []

data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: 'their website wont let you order,they dont return phone calls or e-mails.you should find another place to order what you want')
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: 'Bought 4 dinning room chairs from this company a year ago (Mar 20). Due to missing parts I was only able to assemble 3 of the chairs.')
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: 'If I could give negative stars I would')
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: 'I ordered two end tables, & the ONLY thing that happened was my card being charged the $')
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: 'Suspicious activity on my credit card after giving my card information to this company In California')
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: 'Sent me broken items and they are not replying to any of my emails.')
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: 'This is the worst company to order from. With Shipping delays, lack of communication to extremely poor and unprofessional customer service.')
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: 'Scam scam scam. Order a cedar chest in January 2021. Delivery 5-10 days guaranteed. Still not received and it is March. They will not reply to emails or answer calls. Don\'t buy from them')
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: "Don’t waste your time or money with this company. After placing an order over two months ago that was never shipped, they will not answer the phone or respond to emails. I had to file a complaint with my credit card.")
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: "I was skeptical but placed my order for two barstools. I received shipping confirmation the same day and received the chairs in two days. Best pricing and shipping was awesome. Great experience!")
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: "I ordered a desk last Sunday and it arrived on Wednesday! I did not expect it to be delivered so quickly. I wish they had better communication after your online order was placed.")
data_points_for_task_set_1 << unlabeled_dataset.data_points.create!(input: "I received my game chair and I love it but the wheels don't rolls that well on my tile floor and are marking my floor with black marks. What can I do to fix this.")

data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "After my first visit here, I knew this would be my go to place for furniture!!")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "Really nice employees and great prices. I even got my order a little earlier than expected. One issue turned out to be no issue at all. I purchased a bedroom set and it was a missing a piece to hang the mirror, I called the store and they had a replacement piece sent the next day!!! Disaster averted :)")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "Great company to purchase from. I had a great experience buying a couch from this company and I will definitely be back!")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "Delivered next day after purchase and they had the best price I could find online.")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "Got what we ordered fast but the whole post order (we ordered online) experience left a lot to be desired as emails were unclear and couldn't tell when it was shipping. Things just arrived one day.")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "SCAMMERS...DO NOT ORDER WITH THESE ASS CLOWNS. CHARGED MY CARD AND GOT SAME EMAIL AS OTHERS. HAVE NOT HEARD ANYTHING BACK AND WILL NOT ANSWER INQUIRIES!!!!")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "Has been over two months since I placed an order. No response to emails, no order follow-up. Seriously so bad it feels like a scam.")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "Terrible, placed order 8/25 never came when it was supposed to. I emailed and they said they were behind about 2 weeks. I been emailing them and getting no response at all. I think this is a scam and I’ll need legal help to get my money back.")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "AVOID. TAKES YOUR MONEY AND YOU GET NOTHING IN RETURN. CRIMINALS!!!")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "Fraud seems to be this business way of getting business well thankfully my credit card picked up on the fraud I was going to purchase 2 end tables and a error kept showing the order never approved & I get a message from my credit card saying there’s pending charges but on wyckes never showed it processed just errors. Crooks I will not buy a thing from them.")
data_points_for_task_set_2 << unlabeled_dataset.data_points.create!(input: "Ordered a computer chair. Took a few weeks to receive but it's perfect! Customer service was hard to get a hold of via email. Very happy with the product.")


task_set_1 = TaskSet.create!(name: 'sentiment_analysis_001', task: task_1)
task_set_1.data_points = data_points_for_task_set_1
task_set_1.users = workers.select{ rand > 0.5 }

task_set_2 = TaskSet.create!(name: 'sentiment_analysis_002', task: task_1)
task_set_2.data_points = data_points_for_task_set_2
task_set_2.users = workers.select{ rand > 0.5 }



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