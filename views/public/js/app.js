$("#getNews").on("click", function(){
console.log("clicked");
	$.getJSON("/all", function(news) {
		console.log(news);
		//append news..
	});
});