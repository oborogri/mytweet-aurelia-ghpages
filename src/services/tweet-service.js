import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {PostsUpdate, LoginStatus} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Fixtures, EventAggregator)
export default class TweetService {

  tweets = [];
  users = [];
  posts = 0;
  loggedInUser = [];

  constructor(data, ea) {
    this.tweets = data.tweets;
    this.users = data.users;
    this.ea = ea;
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

  //follow a user
  addFriend(selectedFriend) {
    const friend = {
      firstName: selectedFriend.firstName,
      lastName: selectedFriend.lastName
    };
    console.log('Following: ' + friend.firstName + ' ' + friend.lastName);
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
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
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
      } else {
        status.message = 'Incorrect password';
      }
    } else {
      status.message = 'Unknown user';
    }

    this.ea.publish(new LoginStatus(status));
  }

  //log out function
  logout() {
    const status = {
      success: false,
      message: ''
    };
    this.ea.publish(new LoginStatus(new LoginStatus(status)));
  }
}
