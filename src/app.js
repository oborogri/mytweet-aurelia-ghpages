import {inject} from 'aurelia-framework';
import TweetService from 'services/tweet-service';

@inject(TweetService)
export class App {
  email = 'homer@simpson.com';
  password = 'secret';

  loggedIn = false;
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

  login() {
    console.log(`Logging in with: ${this.email}`);
    this.loggedIn = true;
  }
}
