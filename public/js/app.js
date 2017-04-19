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
  
  //control what is submitted..
  // $.post("/submit", )

  //When user clicks on <span> x, close the modal
  // $(document).on("click", "span", function() {
  //   modal.style.display = "none";
  // });

  $(".close").on("click", function() {
  	$(".modal").hide();
  })

  //When user clicks outside of modal, close it
  // window.onclick = function(event) {
  //   if (event.target == modal) {
  //     modal.style.display = "none";
  //   }
  // }