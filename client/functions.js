//Functions.js: misc functions for various templates to use


// Return an array with ranges
Paginate = function(total, results){
	var range = [];
    var pages = Math.ceil(total/results);
    
    for(var i = 0; i<pages; i++){
      range[i] = {range_lower: ((results*i)+1), range_upper : (results *(i+1))}
    }

    return range;
}