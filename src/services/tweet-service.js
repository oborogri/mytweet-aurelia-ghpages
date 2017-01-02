import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';

@inject(Fixtures)
export default class TweetService {

  tweets = [];
  senders = [];
  friends = [];

  constructor(data) {
    this.tweets = data.tweets;
    this.senders = data.senders;
    this.friends = data.senders;
  }

  posttweet(sender, text) {
    if (( sender && sender !== null) && ( text && text !== null)) {
      const tweet = {
        sender: sender,
        text: text
      };
      this.tweets.push(tweet);
      console.log(sender.firstName + ' tweeted: ' + text);
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
