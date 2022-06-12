# CrowdComputingProject



Expose localhost with loophole:

- download loophole: https://loophole.cloud/download
-  > ./loophole account login
-  > ./loophole http 3000  --hostname cctaskplatformbackend
-  > ./loophole http 3001  --hostname cctaskplatformapp
-  add `config.hosts << "cc_task_platform.loophole.site"` to backend/task_platform/config/initializers/development.rb
-  add `origins 'http://localhost:3001', 'https://cctaskplatformapp.loophole.site'` to backend/task_platform/config/initializers/cors.rb
-  add .env file with contents `REACT_APP_BASE_URL=https://cctaskplatformbackend.loophole.site` to frontend/ folder (and comment out `REACT_APP_BASE_URL=http://localhost:3000`)
-  (re)start `rails server` at port 3000
-  (re)start `npm start` or `yarn start` at port 3001