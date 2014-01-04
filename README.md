Blades of Steel Scorekeeper
======

This is a scorekeeping app to track our scores in Blades of Steel. We've got over 1000 games recorded (on paper) and it's about time we ran the numbers. 

### Getting started
- To run the app, first install Meteor by running this command in terminal:   
`$ curl https://install.meteor.com | /bin/sh`

- Then cd into whatever dir rou choose (like `~/Sites`) and clone this repo:   
`git clone git@github.com:mswartz/blades.git [dir where you want it]`

- Almost there! Now just `cd blades` and type `meteor`.

- Now point your browser to `localhost:3000` and check 'er out. 

### Adding Data
The app doesn't come with any data, you've got to add it using the `/Players` and `/newgame` interface. Go ahead and use the fields there to add (or delete) players and games to check it out and see the stats. 

### Resetting the Databases
If you'd like to start fresh, just go into `/lib/main.js` and uncomment the lines `Games.remove({})` and `Players.remove({})`. Then recomment those and your DBs should be wiped. 

### Meteor
This app is built using the Meteor(http://docs.meteor.com/#top) framework. It's pretty awesome once you figure out how it works. There are HTML templates that use the Handlebars templating system, and each file has an associated JS file that tells it how to act. So for instance:   
- `home.html` is the html template for the front page (name doesn't matter, I made it the front page in the router config)
- `home.js` has the javascript code that retrieves data from the DB and renders it to the page

If you check out some of the examples in `/client/views/` you'll get the hang of it. Meteor provides the `Template.[template name].helpers` and `Template.[template name].events` methods for doing things based on template tags (helpers) and doing things to react to user inputs (events). 

### MongoDB
All the data is stored in MongoDB collections. The JS files interact with these by querying the collections and returning the data, usually in the form of arrays using the `[collection].fetch()` function. Some examples:

#### Retrieving data
- `Games.find({}).fetch()` returns all records in the games collection as an array of objects. Try it out in the console (assuming you've added at least one game)
- `Games.find({_id:[some id]}).fetch()` will return only the record with the `id` we passed it, which in Mongoland looks like this: `PLZ7eiMv7nmP8J49E`
- `Games.find({}, {sort: {game_no:-1}}).fetch()` will return a list of games in descending order of `game_no`. To sort by ascending use `1` instead of `-1`

#### Adding data


