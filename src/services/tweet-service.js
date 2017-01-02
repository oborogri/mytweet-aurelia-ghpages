import {inject} from 'aurelia-framework';
import Fixtures from './fixtures';

@inject(Fixtures)
export default class TweetService {

  tweets = [];
  senders = [];

  constructor(data) {
    this.tweets = data.tweets;
    this.senders = data.senders;
  }

  posttweet(sender, text) {
    if (( sender && sender !== null) && ( text && text !== null)) {
      const tweet = {
        sender: sender,
        text: text
      };
      this.tweets.push(tweet);
    }
    console.log(sender.firstName + ' tweeted: ' + text);
    console.log('Total tweets: ' + this.tweets.length);
  }
}
