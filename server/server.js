Facebook = function(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('me');
}

Facebook.prototype.getFriendsList = function() {
    return this.query('/me/friendlists');
}

Meteor.methods({
	userEmail: function(){
		if (user.services.facebook.email)
			return user.services.facebook.email
		else
			return Meteor.users.findOne(this.userId).emails[0]["address"];
	},
	getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    },
	getFriendsList: function() {   
	    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
	    var data = fb.getFriendsList();
	    return data;
	},
});

Meteor.publish("currentAccessToken", function(){
  return Meteor.users.find(this.userId, {fields: {'services.facebook.accessToken': 1}});
});
Meteor.publish("facebook_email", function(){
	return Meteor.users.find(this.userId, {fields: {'services.facebook.email': 1}});
});