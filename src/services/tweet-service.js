import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {PostsUpdate} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Fixtures, EventAggregator)
export default class TweetService {

  tweets = [];
  users = [];
  friends = [];
  posts = 0;
  loggedInUser = [];

  constructor(data, ea) {
    this.tweets = data.tweets;
    this.users = data.users;
    this.ea = ea;
  }

  //user authenticate handler
  login(email, password) {
    const status = {
      success: false,
      message: ''
    };

    if (this.users[email]) {
      if (this.users[email].password === password) {
        status.success = true;
        status.message = 'logged in';
        this.loggedInUser = this.users[email];
        this.ea.publish(this.loggedInUser);
      } else {
        status.message = 'Incorrect password';
      }
    } else {
      status.message = 'Unknown user';
    }

    return status;
  }

  //compose tweet handler
  posttweet(sender, text) {
    if (( sender && sender !== null) && ( text && text !== null)) {
      const tweet = {
        sender: sender,
        text: text
      };
      this.tweets.push(tweet);
      this.posts = parseInt(this.tweets.length, 10);
      console.log(sender.firstName + ' tweeted: ' + text);
      console.log('Total tweets: ' + this.tweets.length);
      this.ea.publish(new PostsUpdate(this.posts));
    } else {
      console.log('Message body can\'t be empty! Sender name can\'t be blank');
      console.log('Total tweets: ' + this.tweets.length);
    }
  }

  //registering new user
  register(firstName, lastName, email, password) {
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    };
    this.users[email] = newUser;
  }

  addFriend(selectedFriend) {
    const friend = {
      firstName: selectedFriend.firstName,
      lastName: selectedFriend.lastName
    };
    console.log('Following: ' + friend.firstName + ' ' + friend.lastName);
  }
}
