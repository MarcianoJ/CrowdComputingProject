namespace :namespace_name do
  desc "Example task"
  task example_task: :environment do
    puts "Example task run successfully"
  end
end