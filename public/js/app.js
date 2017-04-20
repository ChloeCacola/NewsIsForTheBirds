// var modal = document.querySelector(".modal");


$("#articleinfo").hide();

//show the news
$("#getNews").on("click", function(){
	$("#articleinfo").show();
	console.log("clicked");

	});



$(".addCom").on("click", function() {
  	console.log("comment");
  	var articleId = $(this).data("id");
  	var thisModal = $("[data-target=" + articleId +"]");

  	$(thisModal).show();
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
 		data: {
 			_id: thisId
 		}
 	}).done(function() {
 		console.log("deleted");
 		location.href="/"
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