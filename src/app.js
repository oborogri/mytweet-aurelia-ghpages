import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import TweetService from './services/tweet-service';
import {LoginStatus} from './services/messages';

@inject(EventAggregator, TweetService)
export class App {

  loggedIn = false;
  registered = true;

  constructor(ea, ts) {
    this.tweetService = ts;
    ea.subscribe(LoginStatus, msg => {
      this.loggedIn = msg.status.success;
    });
  }

  //toggle signup view on welcome page
  signup() {
    console.log('Proceed to register');
    this.registered = false;
  }

  //toggle login view on welcome page
  signin() {
    console.log('Proceed to login');
    this.registered = true;
  }

  logout() {
    console.log('Logging out`');
    this.loggedIn = false;
  }
}
