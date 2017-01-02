import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';
import {PostsUpdate} from './messages';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(Fixtures, EventAggregator)
export default class TweetService {

  tweets = [];
  senders = [];
  friends = [];
  posts = 0;

  constructor(data, ea) {
    this.tweets = data.tweets;
    this.senders = data.senders;
    this.friends = data.senders;
    this.ea = ea;
  }

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

  addUser(firstName, lastName) {
    const user = {
      firstName: firstName,
      lastName: lastName
    };
    this.senders.push(user);
  }

  addFriend(sender) {
    const friend = {
      firstName: sender.firstName,
      lastName: sender.lastName
    };
    console.log('Following: ' + friend.firstName + ' ' + friend.lastName);
  }
}
