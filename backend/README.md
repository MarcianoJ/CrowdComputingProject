# CrowdComputingProject

Repository for Group 2 of the CS4145 Crowd Computing course.



## Steps to run backend:

### Preconfigure:
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
    - Check whether postgresql runs on the right port (should be default 5432, configurable in  `/etc/postgresql/POSTGRE_VERSION/main/pg_hba.conf`)
    - Open `/etc/postgresql/POSTGRE_VERSION/main/pg_hba.conf` and change last column of each row to from `peer` or `md5` to `trust`
- Run `cd task_platform` from project root
- Run `rake db:setup` to configure database


### Do after each reboot:
- Start Postgresql server (on Ubuntu: `sudo service postgresql start` on Mac: `brew services restart postgresql`)


### Do after each pull:
- Run `cd task_platform` from project root
- `bundle install` to install/update gems
- `rake db:migrate` to apply new database migrations


### Run Rails server:
- Run `cd task_platform` from project root
- `rails server` or `rails s`, see http://localhost:3000 for result


### Run interactive Rails console:
- Run `cd task_platform` from project root
- `rails console` or `rails c`


### Throw away database and start fresh:
- Run `cd task_platform` from project root
- `rake db:drop`
- `rake db:setup`