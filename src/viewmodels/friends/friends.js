import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Friend {

  users = [];
  firstName = '';
  lastName = '';
  password = '';

  constructor(ts) {
    this.tweetService = ts;
    this.users = ts.users;
    this.selectedFriend = this.users[0];
  }

  addFriend() {
    this.tweetService.addFriend(this.selectedFriend);
  }
}
