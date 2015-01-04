//////////////////////////////////////////////
///
///     mvvm
///     https://github.com/joelcoxokc/mvvm
///     2014, JoelCox
///
'use strict';

/////////////////////////////
///     Module Dependencies
var _     = require('lodash'),
    bogan = require('boganipsum'); // Used for generating random text

////////////////////////
//
//  @wxpose User API
//
module.exports = new User();

function User(app) {
    this.users = _.map(contacts(), function (user, index) {
        user.id = index;
        user.messages = new GenerateRandomMessages(user);
        return user;
    });

    this.idCount = 10;

    this.increment = function() {
        this.idCount++;
        return this.idCount;
    };
}

////////////////////////////////////
//
//  @index
//  @param      param
//  @param      cb
User.prototype.index   = function (cb) {
    cb(null, this.users);
};

////////////////////////////////////
//
//  @show
//  @param      param
//  @param      cb
User.prototype.show    = function (param, cb) {
    var user =    _(this.users).find({id:param});
    if (user) {
        cb(null, user);
    } else {
        cb('User Cannot be found', null);
    }
};

////////////////////////////////////
//
//  @create
//  @param      param
//  @param      cb
User.prototype.create  = function (user, cb) {
    user.id = this.increment();
    this.users.push(user);
    cb(null, user);
};

////////////////////////////////////
//
//  @update
//  @param      param
//  @param      cb
User.prototype.update  = function (user, cb) {};

////////////////////////////////////
//
//  @destroy
//  @param      param
//  @param      cb
User.prototype.destroy = function (param, cb) {};

// Simply generates random users
function GenerateRandomMessages(user) {
    return _.map(_.range(3), function (val) {
        return {
            id: val,
            user: user.id,
            title: bogan({paragraphs: 1}).split(' ').slice(0, 10).join(' '),
            text:  bogan({paragraphs: 1})
        };
    });
}

function contacts() {

    return [{
        group : 'Partner',
        first: 'Bertina',
        last: 'Robert',
        company: '',
        mobile: '121 364 135',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a3.jpg',
        color:'red'
      },
      {
        group : 'Coworkers',
        first: 'Alexandra',
        last: 'Galton',
        company: 'Google Inc.',
        mobile: '102 394 821',
        home: '(021) 9876 9485',
        work: '(021) 2130 3049',
        notes: '',
        avatar: 'img/a0.jpg',
        color:'green'
      },
      {
         group : 'Family',
        first: 'Angela',
        last: 'Oscar',
        company: 'Max Inc.',
        mobile: '100 364 135',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a1.jpg',
        color:'blue'
      },
      {
        group : 'Friends',
        first: 'Annabelle',
        last: '',
        company: '',
        mobile: '324 123 123',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a2.jpg',
        color:'orange'
      },
      {
        group : 'Friends',
        first: 'Brenda',
        last: 'Lanny',
        company: '',
        mobile: '765 434 565',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a4.jpg',
        color:'deep-orange'
      },
      {
        group : 'Group',
        first: 'Britney',
        last: 'Patricia',
        company: '',
        mobile: '432 364 455',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a5.jpg',
        color:'light-blue'
      },
      {
        group : 'Friends',
        first: 'Blanche',
        last: 'Julian',
        company: '',
        mobile: '433 364 234',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a6.jpg',
        color:'pink'
      },
      {
        group : 'Group',
        first: 'Deborah',
        last: 'Darryl',
        company: '',
        mobile: '332 431 223',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a7.jpg',
        color:'red'
      },
      {
        group : 'Group',
        first: 'Elizabeth',
        last: '',
        company: '',
        mobile: '543 453 890',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a8.jpg',
        color:'amber'
      },
      {
        group : 'Partners',
        first: 'Emily',
        last: 'Jolyon',
        company: '',
        mobile: '656 565 789',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a9.jpg',
        color:'lime'
      },
      {
        group : 'Partners',
        first: 'Gertrude',
        last: '',
        company: '',
        mobile: '434 987 898',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a8.jpg',
        color:'orange'
      },
      {
        group : 'Family',
        first: 'Gwynne',
        last: 'Rufus',
        company: '',
        mobile: '098 888 897',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a8.jpg',
        color:'teal'
      },
      {
        group : 'Coworkers',
        first: 'Octavia',
        last: 'Swaine',
        company: '',
        mobile: '854 656 879',
        home: '(021) 1234 8755',
        work: '(021) 9000 9877',
        notes: '',
        avatar: 'img/a8.jpg',
        color:'indigo'
    }];
}