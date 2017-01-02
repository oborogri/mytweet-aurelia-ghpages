import {inject} from 'aurelia-framework';
import {PostsUpdate} from '../../services/messages';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class Stats {

  posts = 0;

  constructor(ea) {
    ea.subscribe(PostsUpdate, msg => {
      this.posts = msg.posts;
    });
  }
}
