import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class User {

  firstName = '';
  lastName = '';

  constructor(ts) {
    this.tweetService = ts;
  }

  addUser() {
    this.tweetService.addUser(this.firstName, this.lastName);
    this.firstName = '';
    this.lastName = '';
  }
}
