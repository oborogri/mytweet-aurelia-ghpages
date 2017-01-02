import {inject} from 'aurelia-framework';
import TweetService from '../services/tweet-service';

@inject(TweetService)
export class Tweet {

  text = '';
  senders = [];
  selectedSender = '';

  constructor(ts) {
    this.tweetService = ts;
    this.senders = ts.senders;
    this.selectedSender = this.senders[0];
  }

  createTweet() {
    this.tweetService.posttweet(this.selectedSender, this.text);
    this.text = '';
    this.selectedSender = '';
  }
}
