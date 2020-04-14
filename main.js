//Get a collection of posts
var $posts = jQuery('.post');
var tagsArray = [];
var $tagsNav = $('.tags-nav');
var $tagLink = $('.tag-link');
var $postsTitle = $('.posts-title');

$tagLink.click(function(evt) {
	// alert($(evt.target).text());
	var linkText = $(evt.target).text();
	if (linkText == "all") {
		$postsTitle.text("Posts");
		$posts.show();
	} else {
		$postsTitle.text("Posts tagged with: " + linkText);
		$posts.hide()
			.filter('.' + linkText)
			.show();
	}
});

$tagLink.detach(); //hide original from view

//Iterate thru the collection and get the tag names.
$posts.each(function(index) {
	var tags = $(this)
		.attr("class")
		.split(" ");

	for (var i = 0; i < tags.length; i++) {
		if ((tags[i] != "post") &&
				(tags[i] != "tag") &&
				(tagsArray.indexOf(tags[i]) < 0)) {

			tagsArray.push(tags[i]);
		}
	}
});
tagsArray.sort();
tagsArray.push("all");
console.log(tagsArray);

for (var i = 0; i < tagsArray.length; i++) {
	//clone the link with events
	$tagLink.clone(true)
		.text(tagsArray[i])
		.appendTo($tagsNav);
}
//Add aside element to display post's tags
$posts.each(function(index) {
	var tags = $(this)
		.attr("class")
		.split(" ");

	var $tagsAside = $('<aside></aside>');
	$tagsAside.addClass('post-tags');

	//Remove "post" and "tag" from classes list
	tags.splice(tags.indexOf("post"), 1);
	tags.splice(tags.indexOf("tag"), 1);
	//console.log(tags);
	$tagsAside.text("Tagged: #" + tags.join(" #"));

	$(this).append($tagsAside);
});

$posts.hover(
	function(evt) { //mouse in
		$(evt.currentTarget).children('.post-tags')
			.slideDown();
	},
	function(evt) { //mouse out
		$(evt.currentTarget).children('.post-tags')
			.slideUp(function() {
				$(this).finish();
		});
	});
