define('app',['exports', 'aurelia-framework', 'aurelia-event-aggregator', './services/messages'], function (exports, _aureliaFramework, _aureliaEventAggregator, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var App = exports.App = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function App(au, ea) {
      var _this = this;

      _classCallCheck(this, App);

      ea.subscribe(_messages.LoginStatus, function (msg) {
        if (msg.status.success === true) {
          au.setRoot('home').then(function () {
            _this.router.navigateToRoute('tweet');
          });
        } else {
          au.setRoot('app').then(function () {
            _this.router.navigateToRoute('login');
          });
        }
      });
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'login'], name: 'login', moduleId: 'viewmodels/login/login', nav: true, title: 'Login' }, { route: 'signup', name: 'signup', moduleId: 'viewmodels/signup/signup', nav: true, title: 'Signup' }]);
      this.router = router;
    };

    return App;
  }()) || _class);
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('home',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia), _dec(_class = function () {
    function Home(au) {
      _classCallCheck(this, Home);

      this.aurelia = au;
    }

    Home.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: ['', 'home'], name: 'tweet', moduleId: 'viewmodels/tweet/tweet', nav: true, title: 'Tweet' }, { route: 'timeline', name: 'timeline', moduleId: 'viewmodels/timeline/timeline', nav: true, title: 'Timeline' }, { route: 'friends', name: 'friends', moduleId: 'viewmodels/friends/friends', nav: true, title: 'Users' }, { route: 'stats', name: 'stats', moduleId: 'viewmodels/stats/stats', nav: true, title: 'Stats' }, { route: 'dashboard', name: 'dashboard', moduleId: 'viewmodels/dashboard/dashboard', nav: true, title: 'Dashboard' }, { route: 'logout', name: 'logout', moduleId: 'viewmodels/logout/logout', nav: true, title: 'Logout' }]);
      this.router = router;
    };

    return Home;
  }()) || _class);
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    longStackTraces: _environment2.default.debug,
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('services/fixtures',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Fixtures = function Fixtures() {
    _classCallCheck(this, Fixtures);

    this.users = {
      'homer@simpson.com': {
        firstName: 'Homer',
        lastName: 'Simpson',
        email: 'homer@simpson.com',
        password: 'secret'
      },
      'marge@simpson.com': {
        firstName: 'Marge',
        lastName: 'Simpson',
        email: 'marge@simpson.com',
        password: 'secret'
      },
      'bart@simpson.com': {
        firstName: 'Bart',
        lastName: 'Simpson',
        email: 'bart@simpson.com',
        password: 'secret'
      },
      'lisa@simpson.com': {
        firstName: 'Lisa',
        lastName: 'Simpson',
        email: 'lisa@simpson.com',
        password: 'secret'
      }
    };
    this.tweets = [];
  };

  exports.default = Fixtures;
});
define('services/messages',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var PostsUpdate = exports.PostsUpdate = function PostsUpdate(posts) {
    _classCallCheck(this, PostsUpdate);

    this.posts = posts;
  };

  var LoginStatus = exports.LoginStatus = function LoginStatus(status) {
    _classCallCheck(this, LoginStatus);

    this.status = status;
  };
});
define('services/tweet-service',['exports', 'aurelia-framework', './fixtures', './messages', 'aurelia-event-aggregator'], function (exports, _aureliaFramework, _fixtures, _messages, _aureliaEventAggregator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  var _fixtures2 = _interopRequireDefault(_fixtures);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var TweetService = (_dec = (0, _aureliaFramework.inject)(_fixtures2.default, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function TweetService(data, ea) {
      _classCallCheck(this, TweetService);

      this.tweets = [];
      this.users = [];
      this.posts = 0;
      this.loggedInUser = [];

      this.tweets = data.tweets;
      this.users = data.users;
      this.ea = ea;
    }

    TweetService.prototype.posttweet = function posttweet(sender, text) {
      if (sender && sender !== null && text && text !== null) {
        var tweet = {
          sender: sender,
          text: text
        };
        this.tweets.push(tweet);
        this.posts = parseInt(this.tweets.length, 10);
        console.log(sender.firstName + ' tweeted: ' + text);
        console.log('Total tweets: ' + this.tweets.length);
        this.ea.publish(new _messages.PostsUpdate(this.posts));
      } else {
        console.log('Message body can\'t be empty! Sender name can\'t be blank');
        console.log('Total tweets: ' + this.tweets.length);
      }
    };

    TweetService.prototype.addFriend = function addFriend(selectedFriend) {
      var friend = {
        firstName: selectedFriend.firstName,
        lastName: selectedFriend.lastName
      };
      console.log('Following: ' + friend.firstName + ' ' + friend.lastName);
    };

    TweetService.prototype.register = function register(firstName, lastName, email, password) {
      var newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      };
      this.users[email] = newUser;
      this.firstName = '';
      this.lastName = '';
      this.email = '';
      this.password = '';
    };

    TweetService.prototype.login = function login(email, password) {
      var status = {
        success: false,
        message: ''
      };

      if (this.users[email]) {
        if (this.users[email].password === password) {
          status.success = true;
          status.message = 'logged in';
          this.loggedInUser = this.users[email];
        } else {
          status.message = 'Incorrect password';
        }
      } else {
        status.message = 'Unknown user';
      }

      this.ea.publish(new _messages.LoginStatus(status));
    };

    TweetService.prototype.logout = function logout() {
      var status = {
        success: false,
        message: ''
      };
      this.ea.publish(new _messages.LoginStatus(new _messages.LoginStatus(status)));
    };

    return TweetService;
  }()) || _class);
  exports.default = TweetService;
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('viewmodels/dashboard/dashboard',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Dashboard = exports.Dashboard = function Dashboard() {
    _classCallCheck(this, Dashboard);
  };
});
define('viewmodels/login/login',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Login(ts) {
      _classCallCheck(this, Login);

      this.tweetService = ts;
      this.prompt = '';
    }

    Login.prototype.login = function login(e) {
      console.log('Trying to log in ' + this.email);
      this.tweetService.login(this.email, this.password);
    };

    return Login;
  }()) || _class);
});
define('viewmodels/friends/friends',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Friend = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Friend = exports.Friend = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function Friend(ts) {
    _classCallCheck(this, Friend);

    this.tweets = [];

    this.tweetService = ts;
    this.tweets = ts.tweets;
    var membersTweet = [];

    this.tweets.forEach(function (tweet) {
      if (membersTweet.indexOf(tweet) === -1) {
        membersTweet.push(tweet);
      }
      return membersTweet;
    });
  }) || _class);
});
define('viewmodels/logout/logout',['exports', '../../services/tweet-service', 'aurelia-framework'], function (exports, _tweetService, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Logout = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Logout = exports.Logout = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Logout(tweetService) {
      _classCallCheck(this, Logout);

      this.tweetService = tweetService;
    }

    Logout.prototype.logout = function logout() {
      console.log('logging out');
      this.tweetService.logout();
    };

    return Logout;
  }()) || _class);
});
define('viewmodels/stats/stats',['exports', 'aurelia-framework', '../../services/messages', 'aurelia-event-aggregator', '../../services/tweet-service'], function (exports, _aureliaFramework, _messages, _aureliaEventAggregator, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Stats = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Stats = exports.Stats = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator, _tweetService2.default), _dec(_class = function () {
    function Stats(ea, ts) {
      var _this = this;

      _classCallCheck(this, Stats);

      this.posts = 0;

      this.ts = ts;
      ea.subscribe(_messages.PostsUpdate, function (msg) {
        _this.posts = msg.posts;
      });
    }

    Stats.prototype.attached = function attached() {
      this.posts = this.ts.posts;
    };

    return Stats;
  }()) || _class);
});
define('viewmodels/signup/signup',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Signup = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Signup = exports.Signup = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Signup(ts) {
      _classCallCheck(this, Signup);

      this.firstName = 'Marge';
      this.lastName = 'Simpson';
      this.email = 'marge@simpson.com';
      this.password = 'secret';

      this.tweetService = ts;
    }

    Signup.prototype.register = function register(e) {
      this.registered = true;
      this.tweetService.register(this.firstName, this.lastName, this.email, this.password);
      this.tweetService.login(this.email, this.password);
    };

    return Signup;
  }()) || _class);
});
define('viewmodels/timeline/timeline',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Timeline = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Timeline = exports.Timeline = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function Timeline(ts) {
    _classCallCheck(this, Timeline);

    this.tweets = [];

    this.tweetService = ts;
    this.tweets = ts.tweets;
  }) || _class);
});
define('viewmodels/tweet/tweet',['exports', 'aurelia-framework', '../../services/tweet-service'], function (exports, _aureliaFramework, _tweetService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tweet = undefined;

  var _tweetService2 = _interopRequireDefault(_tweetService);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Tweet = exports.Tweet = (_dec = (0, _aureliaFramework.inject)(_tweetService2.default), _dec(_class = function () {
    function Tweet(ts) {
      _classCallCheck(this, Tweet);

      this.text = '';
      this.sender = [];

      this.tweetService = ts;
      this.sender = ts.loggedInUser;
    }

    Tweet.prototype.createTweet = function createTweet() {
      this.tweetService.posttweet(this.sender, this.text);
      this.text = '';
    };

    return Tweet;
  }()) || _class);
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n\n    <require from=\"nav-bar.html\"></require>\n    <div class=\"ui container page-host\">\n        <nav-bar router.bind=\"router\"></nav-bar>\n        <router-view></router-view>\n    </div>\n\n</template>"; });
define('text!home.html', ['module'], function(module) { module.exports = "<template>\r\n    <require from=\"nav-bar.html\"></require>\r\n    <div class=\"ui container page-host\">\r\n        <nav-bar router.bind=\"router\"></nav-bar>\r\n        <router-view></router-view>\r\n    </div>\r\n</template>"; });
define('text!nav-bar.html', ['module'], function(module) { module.exports = "<template bindable=\"router\">\r\n    <nav class=\"ui inverted grey menu\">\r\n        <header class=\"header item\"><a href=\"/\"> MyTweet </a></header>\r\n        <div class=\"right menu\">\r\n            <div repeat.for=\"row of router.navigation\">\r\n                <a class=\"${row.isActive ? 'active' : ''} item\"  href.bind=\"row.href\">${row.title}</a>\r\n            </div>\r\n        </div>\r\n    </nav>\r\n</template>"; });
define('text!viewmodels/dashboard/dashboard.html', ['module'], function(module) { module.exports = "<template>\r\n    <section class=\"ui grid segment\">\r\n        <div class=\"four wide column\">\r\n            <compose view-model=\"../tweet/tweet\"></compose>\r\n        </div>\r\n        <div class=\"one wide  column\">\r\n            <compose class=\"ui column\" view-model=\"../stats/stats\"></compose>\r\n        </div>\r\n        <div class=\"six wide column\">\r\n            <compose class=\"six wide column\" view-model=\"../timeline/timeline\"></compose>\r\n        </div>\r\n        <div class=\"four wide column\">\r\n            <compose class=\"two wide column\" view-model=\"../friends/friends\"></compose>\r\n        </div>\r\n    </section>\r\n</template>"; });
define('text!viewmodels/friends/friends.html', ['module'], function(module) { module.exports = "<template>\r\n    <article class=\"ui stacked segment\">\r\n    <h4 class=\"ui dividing header\">MyTweet users</h4>\r\n    <table class=\"ui celled table segment\">\r\n        <thead>\r\n        <tr>\r\n            <th>Name</th>\r\n            <th>Email</th>\r\n        </tr>\r\n        </thead>\r\n        <tbody>\r\n        <tr repeat.for=\"tweet of membersTweet\">\r\n            <td> ${tweet.sender.firstName}</td>\r\n            <td> ${tweet.sender.email}</td>\r\n        </tr>\r\n        </tbody>\r\n    </table>\r\n    </article>\r\n</template>"; });
define('text!viewmodels/login/login.html', ['module'], function(module) { module.exports = "<template>\r\n    <section class=\"ui stacked segment\">\r\n        <div class=\"ui three column grid\">\r\n            <div class=\"ui four wide column\">\r\n                <img src=\"../../../../assets/images/welcome.jpg\" class=\"ui medium image\">\r\n            </div>\r\n            <div class=\"ui six wide column\">\r\n                <h2> Welcome to MyTweet</h2>\r\n                <p> Connect with your friends — and other fascinating people.<br>\r\n                    Get in-the-moment updates on the things that interest you.<br>\r\n                    And watch events unfold, in real time, from every angle.\r\n                </p>\r\n                <p>\r\n                    You need to create an account to use our Services.<br>\r\n                    You are responsible for safeguarding your account, so use a strong password and limit its use to\r\n                    this account.\r\n                </p>\r\n            </div>\r\n            <div class=\"ui six wide column fluid form\">\r\n                <form submit.delegate=\"login($event)\" class=\"ui stacked segment form\">\r\n                    <h5 class=\"ui dividing header\">Sign in</h5>\r\n                    <div class=\"field\">\r\n                        <label>Username</label> <input placeholder=\"Email\" value.bind=\"email\">\r\n                    </div>\r\n                    <div class=\"field\">\r\n                        <label>Password</label> <input type=\"password\" value.bind=\"password\">\r\n                    </div>\r\n                    <button class=\"ui tiny grey submit button\"><i class=\"sign in icon\"></i>Sign in</button>\r\n                    <h5>${prompt}</h5>\r\n                </form>\r\n                </div>\r\n            </div>\r\n    </section>\r\n</template>"; });
define('text!viewmodels/logout/logout.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <form submit.delegate=\"logout($event)\" class=\"ui stacked segment form\">\r\n        <h5 class=\"ui header\">Are you sure you want to log out?</h5>\r\n        <button class=\"ui grey tiny submit button\"><i class=\"sign out icon\"></i>Logout</button>\r\n    </form>\r\n\r\n</template>"; });
define('text!viewmodels/timeline/timeline.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <article class=\"ui stacked segment\">\r\n        <h4 class=\"ui dividing header\">MyTweet timeline</h4>\r\n        <table class=\"ui celled table segment\">\r\n            <thead>\r\n            <tr>\r\n                <th>Sender</th>\r\n                <th>Text</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n            <tr repeat.for=\"tweet of tweets\">\r\n                <td> ${tweet.sender.firstName} ${tweet.sender.lastName}</td>\r\n                <td> ${tweet.text}</td>\r\n            </tr>\r\n            </tbody>\r\n        </table>\r\n    </article>\r\n\r\n</template>"; });
define('text!viewmodels/signup/signup.html', ['module'], function(module) { module.exports = "<template>\r\n    <section class=\"ui stacked segment\">\r\n        <div class=\"ui three column grid\">\r\n            <div class=\"ui four wide column\">\r\n                <img src=\"../../../../assets/images/welcome.jpg\" class=\"ui medium image\">\r\n            </div>\r\n            <div class=\"ui six wide column\">\r\n                <h2> Welcome to MyTweet</h2>\r\n                <p> Connect with your friends — and other fascinating people.<br>\r\n                    Get in-the-moment updates on the things that interest you.<br>\r\n                    And watch events unfold, in real time, from every angle.\r\n                </p>\r\n                <p>\r\n                    You need to create an account to use our Services.<br>\r\n                    You are responsible for safeguarding your account, so use a strong password and limit its use to this account.\r\n                </p>\r\n            </div>\r\n            <div class=\"ui six wide column fluid form\">\r\n                    <form submit.delegate=\"register($event)\" class=\"ui stacked segment form\">\r\n                        <h5 class=\"ui dividing header\">Register</h5>\r\n                        <div class=\"two fields\">\r\n                            <div class=\"field\">\r\n                                <label>First Name</label>\r\n                                <input placeholder=\"First Name\" type=\"text\" value.bind=\"firstName\">\r\n                            </div>\r\n                            <div class=\"field\">\r\n                                <label>Last Name</label>\r\n                                <input placeholder=\"Last Name\" type=\"text\" value.bind=\"lastName\">\r\n                            </div>\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <label>Email</label>\r\n                            <input placeholder=\"Email\" type=\"text\" value.bind=\"email\">\r\n                        </div>\r\n                        <div class=\"field\">\r\n                            <label>Password</label>\r\n                            <input type=\"password\" value.bind=\"password\">\r\n                        </div>\r\n                        <button class=\"ui tiny grey submit button\"><i class=\"add user icon\"></i>Submit</button>\r\n                    </form>\r\n                </div>\r\n            </div>\r\n    </section>\r\n</template>"; });
define('text!viewmodels/tweet/tweet.html', ['module'], function(module) { module.exports = "<template>\r\n    <form submit.trigger=\"createTweet()\" class=\"ui form ten wide column stacked segment\">\r\n        <h5 class=\"ui dividing header\">Enter text here 140 characters max</h5>\r\n        <div class=\"field\">\r\n            <textarea maxlength=\"140\" value.bind=\"text\" placeholder=\"What's on your mind?\"></textarea>\r\n        </div>\r\n        <button class=\"ui grey submit button\"><i class=\"twitter icon\"></i>Post</button>\r\n    </form>\r\n</template>"; });
define('text!viewmodels/stats/stats.html', ['module'], function(module) { module.exports = "<template>\r\n\r\n    <section class=\"ui stacked statistic mini segment\">\r\n        <div class=\"value\"><i class=\"twitter icon\"></i>\r\n            ${posts}\r\n        </div>\r\n        <div class=\"label\">\r\n            Posts\r\n        </div>\r\n    </section>\r\n\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map