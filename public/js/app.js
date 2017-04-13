var modal = document.getElementById("commentModal");
var span = document.getElementsByClassName("close")[0];

$(".articleinfo").hide();

$.getJSON("/all", function(news) {
	$("#getNews").on("click", function(){
	console.log("clicked");
	$(".articleinfo").show();

		for (var i=0; i<news.length; i++) {
			console.log(news[i].title);
			
			//append news..
		}
	});
});

  $(".addCom").on("click", function() {
  	console.log("comment");
  	$("#commentModal").show();
  });
  

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