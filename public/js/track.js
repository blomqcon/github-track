$(document).ready(function(){
	updateOrgs();
});


function updateOrgs() {
	var orgs = [{"name": "Microsoft", "updated": "2012-04-23T14:25:43.511Z"},
				{"name": "Google", "updated": "2012-04-23T14:15:43.511Z"}];
	var list = $("#orgs-list");
	$.each(orgs, function(index, value) {
		//var org = $("<li></li>").append($("<a></a>").attr("href", "http://google.com").html(value.name));
		var updated = new Date(value.updated);
		var org2 = $("<div></div>").html(value.name + " - Updated: " + updated.toLocaleString("en-US"));
		list.append(org2);
	});
}