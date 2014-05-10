Meteor.autosubscribe(function(){
  currentUser = Meteor.user();
  Meteor.subscribe('facebook_email');
});

Deps.autorun(function(){
	if(Session.get("error"))
		console.log(Session.get("error"))
});

Template.displayInfo.email = function(){
	if(Meteor.user())
		return currentUser.services.facebook.email;
};
Template.displayInfo.name = function(){
	if(Meteor.user())
		return currentUser.services.facebook.name;
};
Template.displayInfo.profileInfo = function(){
	if (Meteor.user()){
		Meteor.call('getUserData', function(error, result){
			if(error)
				Session.set("error", error);
			if(result)
				Session.set("currentUser", result);
		});
		return Session.get("currentUser");
	}
};

Template.displayFriends.friendsList = function(){
	if (Meteor.user()){
		Meteor.call('getFriendsList', function(error, result){
			if(error)
				Session.set("error", error)
			if(result)
				Session.set("friendsList", result);
		});
		return Session.get("friendsList");
	}
}



