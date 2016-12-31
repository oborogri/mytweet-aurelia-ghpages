export class Tweet {

  senders= [
    {
      firstName: 'Homer',
      lastName: 'Simpson'
    },
    {
      firstName: 'Lisa',
      lastName: 'Simpson'
    },
    {
      firstName: 'Bart',
      lastName: 'Simpson'
    }
  ];
  selectSender=this.senders[0];

  createTweet() {
    console.log(`New tweet from: ${this.selectedSender.firstName} ${this.selectedSender.lastName}`);
    console.log(`Message: ${this.text}`);
  }
}
