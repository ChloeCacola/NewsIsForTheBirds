$("#getNews").on("click", function(){

	$.getJSON("/all", function(news) {
		console.log(news);
		//append news..
	});
});