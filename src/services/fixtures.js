export default class Fixtures {

  senders = [
    {
      firstName: 'Homer',
      lastName: 'Simpson'
    },
    {
      firstName: 'Bart',
      lastName: 'Simpson'
    }
  ];

  tweets = [
    {
      text: 'Hi from Homer',
      sender: this.senders[0]
    },
    {
      text: 'Hi from Bart',
      sender: this.senders[1]
    }
  ];
}
