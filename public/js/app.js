$("#getNews").on("click", function(){
console.log("clicked");
	$.getJSON("/all", function(news) {
		for (var i=0; i<news.length; i++) {
		console.log(news[i].title);
		//append news..
	}
	});
});