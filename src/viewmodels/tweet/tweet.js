import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Tweet {

  text = '';
  sender = [];

  constructor(ts) {
    this.tweetService = ts;
    this.sender = ts.loggedInUser;
  }

  createTweet() {
    this.tweetService.posttweet(this.sender, this.text);
    this.text = '';
  }
}
