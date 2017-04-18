var modal = document.getElementById("commentModal");
var span = document.getElementsByClassName("close")[0];

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
  	$("#commentModal").show();
  });

//post comment to correct article
  $(".subBtn").on("click", function() {
  	var thisId = $(".subBtn").attr("data-id");

  	$.ajax({
  		method: "POST",
  		url: "/submit/" + thisId
  	});

  })
  
  //control what is submitted..
  // $.post("/submit", )

  //When user clicks on <span> x, close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  //When user clicks outside of modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }