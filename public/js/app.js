// var modal = document.querySelector(".modal");


$(".articleinfo").hide();

// $.getJSON("/all", function(news) {
$("#getNews").on("click", function(){
	$(".articleinfo").show();
	console.log("clicked");
		// for (var i=0; i<news.length; i++) {
		// 	console.log(news[i].title);
			
		// 	//append news..
		// }
	});
// });

  $(".addCom").on("click", function() {
  	console.log("comment");
  	var articleId = $(this).data("id");
  	var thisModal = $("[data-target=" + articleId +"]");

  	$(thisModal).show();
  	// $("#commentModal").show();
  });

//post comment to correct article
  $(".subBtn").on("click", function(e) {
  	// e.preventDefault();
  	var thisId = $(".subBtn").attr("data-id");
  	var comment = $(this).parent().children("textarea").val()

  	// $.ajax({
  	// 	method: "POST",
  	// 	url: "/submit/" + thisId,
  	// 	body: {
  	// 		comment
  	// 	}
  	// }).done(function() {
  	// 	console.log("working");
  	// });

  });

 //delete a comment
 $(document).on("click", ".delCom", function(e) {
 	//prevent form from submitting
 	// e.preventDefault();
 	//article id
 	var articleId = $("#articleTitle").attr("data-id");
 	//comment id
 	var thisId = $(this).attr("data-id");

 	console.log(articleId);
 	console.log(thisId);

 	$.ajax({
 		method: "POST",
 		url: "/delete/" + articleId,
 		body: {
 			_id: thisId
 		}
 	}).done(function() {
 		console.log("deleted");
 	});

 });

//close the comment modal
  $(".close").on("click", function() {
  	$(".modal").hide();
  })

  //When user clicks outside of modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }