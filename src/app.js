import {inject} from 'aurelia-framework';
import TweetService from 'services/tweet-service';

@inject(TweetService)
export class App {

  loggedIn = false;
  registered = true;

  constructor(ts) {
    this.tweetService = ts;
  }

  //user login
  login(e) {
    console.log(`Attempting log in with: ${this.email} ${this.password}`);
    const status = this.tweetService.login(this.email, this.password);
    this.prompt = status.message;
    this.loggedIn = status.success;
    this.email = '';
  }

  register(e) {
    this.registered = true;
    this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
    console.log(`New member registered : ${this.email}`);
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }

  logout() {
    console.log('Logging out');
    this.loggedIn = false;
  }

  //toggle to signup view
  signup() {
    console.log('Proceed to register');
    this.registered = false;
  }

  //toggle to login view
  signin() {
    console.log('Proceed to login');
    this.registered = true;
  }
}
