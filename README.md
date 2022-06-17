# CrowdComputingProject

Repository for Group 2 - the HIT-men of the CS4145 Crowd Computing course.



### Steps to run backend:

#### Preconfigure:
- On Windows installation via WSL/WSL2 is recommended to avoid frustration and crying
- Install Ruby 3 (3.1.1, recommended via rbenv or rvm as version manager)
- Install Node 16 (16.15, recommended via nvm as version manager)
- Install bundler gem with `gem install bundler`
- (Installing Rails may not be needed. If I'm wrong install Rails 6 (6.1.6) with `gem install rails --version 6.1.6`

- For WSL: Make sure Postgresql isn't already installed in Windows (otherwise uninstall, or use this one and skip next step)
- Install Postgresql (on Ubuntu: `sudo apt-get install postgresql`, on Mac: `brew install postgresql`)
  - Start Postgresql server (on Ubuntu: `sudo service postgresql start` on Mac: `brew services restart postgresql`)
  - Set password for postgres user with `sudo -u postgres psql` then `ALTER USER postgres WITH SUPERUSER PASSWORD 'postgres';`
  - If issues occur:
    - Check whether postgresql runs on the right port (should be default 5432, configurable in  `/etc/postgresql/<POSTGRES_VERSION>/main/pg_hba.conf`)
    - Open `/etc/postgresql/<POSTGRES_VERSION>/main/pg_hba.conf` and change last column of each row to from `peer` or `md5` to `trust`
- Run `cd backend/task_platform` from project root
- Run `rake db:setup` to configure database


#### Do after each reboot:
- Start Postgresql server (on Ubuntu: `sudo service postgresql start` on Mac: `brew services restart postgresql`)


#### Do after each pull:
- Run `cd task_platform` from project root
- `bundle install` to install/update gems
- `rake db:migrate` to apply new database migrations


#### Run Rails server:
- Run `cd task_platform` from project root
- `rails server` or `rails s`, see http://localhost:3000 for result


#### Run interactive Rails console:
- Run `cd task_platform` from project root
- `rails console` or `rails c`


#### Throw away database and start fresh:
- Run `cd task_platform` from project root
- `rake db:drop`
- `rake db:setup`


### Steps to run frontend:
- Run the backend rails server first (using the steps above)
- Run `cd frontend` from project root
- Add a file `.env` in the `frontend/` root folder, with contents: `REACT_APP_BASE_URL=http://localhost:3000` (or `REACT_APP_BASE_URL=https://cctaskplatformbackend.loophole.site` if running with Loophole).
- Install npm or yarn
- Run `npm install` or `yarn install`
- Run `npm start` or `yarn start`
- Type enter in case you are asked to change ports. Verify that the frontend server runs on port 3001





### Expose localhost with Loophole for evaluation phase:

- download loophole: https://loophole.cloud/download
-  > ./loophole account login
-  > ./loophole http 3000  --hostname cctaskplatformbackend
-  > ./loophole http 3001  --hostname cctaskplatformapp
-  add `config.hosts << "cctaskplatformbackend.loophole.site"` to backend/task_platform/config/initializers/development.rb if not already present
-  add `origins 'http://localhost:3001', 'https://cctaskplatformapp.loophole.site'` to backend/task_platform/config/initializers/cors.rb if not already present
-  add .env file with contents `REACT_APP_BASE_URL=https://cctaskplatformbackend.loophole.site` to frontend/ folder (and comment out `REACT_APP_BASE_URL=http://localhost:3000`)
-  (re)start `rails server` at port 3000
-  (re)start `npm start` or `yarn start` at port 3001



## Documentation

### The goal

The goal of this application is to recruit workers to work on classification based NLP tasks while entertaining them, and collect their rationales behind their classification choices. Can be used as enrichment for the classifications in a dataset or to compare with 'rationales' (e.g. average attention over input segments) from machine learning models.


### The game

The worker is situated in an encounter between aliens and humanity. Bob, the translator robot is the only one capable to decode the aliens messages to save the world. The worker 'teaches' the robot to decrypt the alien messages by filling in the tasks on their screen. Tasks and task sets are given randomly to the worker. After each set of tasks the message is decrypted and the conversation between alien and robot advances. The worker can continue the story by doing more tasks.


### Frontend workings











### Backend workings

The backend is implemented in Ruby on Rails and has three main responsibilities: importing datasets, creating and distributing task_sets and communicating with the frontend using the API. All backend code is housed in the `backend/task_platform/` folder. References to backend files or folders will assume this as prefix to their paths. The backend server in the development environment is hosted by default on localhost on port 3000 and accepts external (frontend) connections from port 3001. The above mentioned hosts (ending in `.loophole.site`) are also accepted when using Loophole.


#### Database design

The tables that are needed for this application can be viewed in `db/schema.rb`, along with their columns and column types. They are accompanied by models with camel-cased versions of their names in `app/models/`.

#### Importing datasets

Importing datasets happens in the `db/seeds.rb` file, which runs by executing the commands `rake db:setup` or `rake db:seed`. Currently, four datasets are imported: gold standard and open, for both the tasks sentiment analysis and textual entailment. The datasets are in JSON format and contained in `app/assets/datasets`, along with the scripts to preprocess them. New tasks and datasets can be added here as well. Each data_point needs an input for single-input NLP tasks like sentiment analysis, and also an input2, which corresponds to input for multi-input tasks like textual entailment. For gold standard datasets a classification (should match the classification_options added to the task), rationale_words and rationale_words2 (array of highlights for each input). Lastly, for NLP tasks that need different classification options for each data_point (e.g. multiple choice question answering) these can be added to custom_options.



#### Handling task_sets

Workers can join either anonymously, or using login credentials if they want to keep their progress. When a worker (model name: user, role: :user) has been created or finishes task_sets already assigned to them new task_sets will dynamically be created and assigned if needed. The method `self.create_from_data_points` in `app/models/task_set.rb`, and `assign_to_task_sets` in `app/models/user.rb` take care of this. For each task a check is performed to see whether users have open (not finished) task_sets left. If the number is below `UNFINISHED_TASK_SET_AMOUNT` (default = 1), then new task_sets are assigned if they exist, or created and assigned if there are none. Task_sets by default generated with 10 random, unused data_points, from which 3 are honey pots.

The assignment of task_sets to users (which happens by linking them together with a `task_sets_user`) happens so that data labeling is optimized. Task_sets that are finished less than `MIN_REQUIRED_ASSIGNS_FOR_LABEL` (default = 5) times (not completed), which were not already assigned or finished by a user, are assigned first, with the most priority to the highest number of finishes. If there are none left, task_sets that have not been finished before are chosen, and lastly if all other data_points have been classified suffiently, completed (finished `MIN_REQUIRED_ASSIGNS_FOR_LABEL` times or more) are chosen to add more classifications to these data_points in order to increase confidence.

This way, workers are guaranteed to always get assigned new task_sets containing data_points that are most useful to process.

Task_results contain the users' classifications and rationales, and are created and linked to the task_set, user and data_point. For multi-input NLP tasks each item in rationale_words are paired with the item with the same index in rational_words2.


#### API

The frontend can communicate with the backend via the API. Its controllers are contained in the folder `app/controllers/api/v1/`, and their routes described in `config/routes.rb` and can be listed with the command `rails routes`.  User authentication happens using JSON Web Tokens (JWT) and token creation logic is housed in `app/services/jwt_service.rb`. First, a request to the sessions endpoint is needed to sign in, which outputs the user's token as result. Then, for each subsequent request from the same user, this token has to be included as parameter `token`. Accepted input parameters and output are included as comments within each API controller file. These are the supported API endpoints:

##### POST `<root_url>/api/v1/sessions`

Used to verify credentials and sign in user. Use `"email": "anonymous"` to generate a new anonymous user instead. Returns the token needed for the other endpoints

##### GET `<root_url>/api/v1/alien_stories`

Returns a list of available alien_stories (an alien_story is a collection of alien_comments that describe a conversation between the aliens and Bob, the translator robot).

##### GET `<root_url>/api/v1/next_alien_comment`

Returns the next part of the alien-robot dialogue.

##### GET `<root_url>/api/v1/tasks`

Returns a list of available tasks contained in the application.

##### GET `<root_url>/api/v1/random_task_set`

Returns a random not-finished task_set, assigned to the user, for the user to work on. Can be filtered by adding the parameters task_id or nlp_kind.

##### GET `<root_url>/api/v1/next_data_point`

Returns the next data_point in the task_set.

##### GET `<root_url>/api/v1/unfinished_data_points`

Returns a list of unfinished (without task_result for user) data_points.

##### POST `<root_url>/api/v1/task_results`

Used to post task_results back to the backend to be stored.

##### POST `<root_url>/api/v1/batch_task_results`

Same as above, but for a batch of task_results.

##### GET `<root_url>/api/v1/users`

Returns a list of users currently stored (added for debugging).



#### Other

To make frontend and backend debugging, and examining or editing database contents easier for the whole team, pages were created to do that (files directly in folder `app/controllers/` and folders in `app/views/`). These do not affect the core logic of the application, but were useful for developing.
