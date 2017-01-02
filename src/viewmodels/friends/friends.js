import {inject} from 'aurelia-framework';
import TweetService from '../../services/tweet-service';

@inject(TweetService)
export class Friend {

  senders = [];
  firstName = '';
  lastName = '';

  constructor(ts) {
    this.tweetService = ts;
    this.senders = ts.senders;
    this.selectedFriend = this.senders[0];
  }

  addFriend() {
    this.tweetService.addFriend(this.selectedFriend);
  }
}
