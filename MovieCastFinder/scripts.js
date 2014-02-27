$( document ).ready(function() {
	$(".search-fields").keydown(function() {
		console.log( "Handler for .keypress() called." );
	});

	$( "#search-btn" ).click(function() {
		search();
	});
	
	$(window).keydown(function(event){
	    if(event.keyCode == 13) {
	      search();
	    }
  });
  
  
});

var finished = false;
var actors1 = [];
var actors2 = [];
var actors1Filter = [];
var actors2Filter = [];
var sharedActors = [];
var actorImages = [];



function search(){
	console.log("search");
	var movie1 = $('#search1').val();
	var movie2 = $('#search2').val();	
	var movies = [];
	
	
	if(movie1 != '' && movie2 != ''){
		$( "#search-form" ).fadeOut( "slow" );
		movies.push(movie1,movie2);
		getMovieIDs(movies);
	}else{
		alert("Both Fields Are Required");
	}
	
	
}

//Called once from search();
function getMovieIDs(movies){
	console.log("getMovieIDs");
	console.log(movies);
	var status = false;
	if(status == false){
		console.log(status);
		for(var i=0; i < movies.length; i++){
				var url = "http://api.themoviedb.org/3/search/movie?api_key="+api_key+"&query="+movies[i];
				$.ajax({
					dataType: "json",
					url: url,
					success: function(success){
						//actorData = getActors(success);
						if(status == false){
							if(typeof(success.results[0]) == 'undefined'){
								var string = '<div style="height:80px" class="comment-list styled clearfix"><ol><li class="comment first last"><div class="comment-body boxed"><div class="comment-arrow"></div><div class="comment-avatar"><div class="avatar"><img alt="" src="images/no-result.png"></div></div><div class="comment-text"><div class="comment-author clearfix"><h1 class="link-author error">At least one of those movies do not exist!</h1><p class="error">Perhaps you misspelled something?</p></div><span class="btn"><a href="index.html" style="text-decoration: none;"><input class="gradient" type="submit" value="Search Again" hidefocus="true" style="outline: medium none; cursor: pointer; text-decoration: none; border-style: none;"></a></span><div class="clear"></div></div></div> '
								$('#results').append(string);
								$( "#results" ).fadeIn( "slow" );
								status = true;

								console.log(status);
							}else{
								var id = success.results[0].id;
								getActors(id);
							}
						}
					},
					error: function(){
						console.log("bad request");
					},
					type: "GET",
					async:false
				});
		}
	}
}


//Called twice from getMovieID - once for each movie
function getActors(id){
	console.log("getActors");
	if(id != undefined){
		//console.log(id);
		
		var url = "http://api.themoviedb.org/3/movie/"+id+"/credits?api_key="+api_key;
		
		$.ajax({
				dataType: "json",
				url: url,
				success: function(success){
					//console.log(success);
					var actors = success.cast;
					//console.log(actors);
					// If finished == false then we are on the first movie
					if(finished == false){
						console.log("actors1 populated");
						actors1.push(actors);
						finished = true; //Set to true so we know we finished the first movie request
					}else{
						console.log("actors2 populated");
						actors2.push(actors);
						groupActors();
					}
				},
				type: "GET"
			});	
	}
}


// Called twice - because getActors is called twice from getMovieID
function groupActors(){
	//console.log(actors1);
	console.log("groupActors");
	for(var i=0; i < actors1.length; i++){
		var thisActor = actors1[i];
		
		for(var j=0; j < actors1[i].length; j++){
			//console.log(actors1[i][j].name);
			var name = actors1[i][j].name;
			actors1Filter.push(name);
			console.log("actors1Filter");
			console.log(actors1Filter);
		}
	}
	
	for(var i=0; i < actors2.length; i++){
		var thisActor = actors2[i];
		for(var j=0; j < actors2[i].length; j++){
			//console.log(actors2[i][j].name);
			var name = actors2[i][j].name;
			actors2Filter.push(name);
			console.log("actors2Filter");
			console.log(actors2Filter);
		}
	}
	
	
	var sharedActors = compareActors();
	for(var i=0; i < sharedActors.length; i++){
		var actor = sharedActors[i];
		getImages(actor);
	}
	displayActors(sharedActors);
}


function getImages(actor){
	console.log("getImages");
	console.log(actor);

	var url = "http://api.themoviedb.org/3/search/person?api_key="+api_key+"&query="+actor;
	var thisImage;
	
	for(var i=0; i < sharedActors.length; i++){
		$.ajax({
				dataType: "json",
				url: url,
				success: function(success){
					//actorData = getActors(success);
					//getActors(success);
					var imagePath = success.results[0].profile_path;
					console.log(imagePath);
					if(imagePath != undefined){
						actorImages.push(imagePath);
						
					}else{
					
					}
					
				},
				error: function(){
					console.log("bad request");
				},
				type: "GET"
			});	
	}
}



function compareActors(){
	console.log("compareActors");
	var ret = [];
    for(i in actors1Filter) {
        if(actors2Filter.indexOf( actors1Filter[i] ) > -1){
            ret.push( actors1Filter[i] );
        }
    }
    return ret;
}


function displayActors(actors){
	console.log("displayActors");
	console.log(actors);
	if(actors != []){
		console.log(actors);
		//for(var i = 0; i < actors.length; i++){
			//actorImages.push(actorImg);
			//console.log(actorImg);
		//	console.log(actorImages[i]);
		//var imgPath = "http://d3gtl9l2a4fn1j.cloudfront.net/t/p/w500/"+actorImages[i];
		//console.log(imgPath);
	
		if(actors.length <= 0){
			//var string = '<h1>There are no shared actors in those movies!</h1>';
			var string = '<div style="height:80px" class="comment-list styled clearfix"><ol><li class="comment first last"><div class="comment-body boxed"><div class="comment-arrow"></div><div class="comment-avatar"><div class="avatar"><img alt="" src="images/no-result.png"></div></div><div class="comment-text"><div class="comment-author clearfix"><h1 class="link-author error">There are no common actors in these movies!</h1></div><span class="btn"><a href="index.html" style="text-decoration: none;"><input class="gradient" type="submit" value="Search Again" hidefocus="true" style="outline: medium none; cursor: pointer; text-decoration: none; border-style: none;"></a></span><div class="clear"></div></div></div> ';
			
			string += "";
			$('#results').append(string);
			$('#results').fadeIn("slow");
		}else{
			var string = '';		
			for(var i=0; i < actors.length; i++){
				string+='<div class="comment-list styled clearfix"><ol><li class="comment first last"><div class="comment-body boxed"><div class="comment-text"><div class="comment-author clearfix"><h1 class="link-author">'+actors[i]+'</h1></div><div class="clear"></div></div></li></ol></div>';	
			}
			
			string+= "<span class='btn'><a href='index.html' style='text-decoration: none;'><input class='gradient' type='submit' value='Search Again' hidefocus='true' style='outline: medium none; cursor: pointer; text-decoration: none; border-style: none;'></a></span>"
	
			$('#results').append(string);
			$( "#results" ).fadeIn( "slow" );
		}
	//}
}
}
