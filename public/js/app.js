var modal = document.getElementById("commentModal");
var add = document.getElementsByClassName("addCom");
var span = document.getElementsByClassName("close")[0];
modal.style.display = "none";

$(".articleinfo").hide();

$("#getNews").on("click", function(){
console.log("clicked");
	$.getJSON("/all", function(news) {

		for (var i=0; i<news.length; i++) {
		console.log(news[i].title);
		$(".articleinfo").show();
		//append news..
	}
	});
});

  add.onclick = function() {
    modal.style.display = "block";
  }

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