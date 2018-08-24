
$.getJSON("/news", function(data) {
    
    for (var i = 0; i < data.length; i++) {
      
      $("#news").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");
    }
  });
  
  
  
  $(document).on("click", "p", function() {
    
    $("#comments").empty();
    
    var thisId = $(this).attr("data-id");
  
    
    $.ajax({
      method: "GET",
      url: "/news/" + thisId
    })
      
      .then(function(data) {
        console.log(data);
        
        $("#comments").append("<h2>" + data.title + "</h2>");
        
        $("#comments").append("<input id='titleinput' name='title' >");
        
        $("#comments").append("<textarea id='bodyinput' name='body'></textarea>");
        
        $("#comments").append("<button data-id='" + data._id + "' id='savecomment'>Save Comment</button>");
  
        
        if (data.comment) {
          
          $("#titleinput").val(data.comment.title);
          
          $("#bodyinput").val(data.comment.body);
        }
      });
  });
  
  
  $(document).on("click", "#savecomment", function() {
    
    var thisId = $(this).attr("data-id");
  
    
    $.ajax({
      method: "POST",
      url: "/news/" + thisId,
      data: {
        
        title: $("#titleinput").val(),
        
        body: $("#bodyinput").val()
      }
    })
      
      .then(function(data) {
        
        console.log(data);
        
        $("#comments").empty();
      });
  
    
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  