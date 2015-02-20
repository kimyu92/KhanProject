
var debug = false;
var editor;
var textArea = document.getElementById('hint');
var timeOut = 1800;

//Editor settings
editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.getSession().setMode("ace/mode/javascript");



//Accepted and Rejected keywords
var accepted = ["for"];
var rejected =  ["console"];
var tree = null;
var timedCall = null;



document.getElementById('editor').onkeyup = function(){
	
	if(timedCall != null){
		clearTimeout(timedCall);
	}
	timedCall = setTimeout(update, timeOut);
}


//Listens in on user keypresses and parses javascript 
//into tree if possible
function update()
{
	try{
		tree = acorn.parse(editor.getValue());	
		if(typeof tree !== "undefined"){

			var resultWhite = whiteList(accepted);
			var resultBlack = blackList(rejected);
			textArea.defaultValue = "WhiteList: " + resultWhite + "  BlackList: " + resultBlack +"\n";
		}

		if(debug)
			console.log("Whitelist: " + resultWhite + "\nBlacklist: " + resultBlack);
	}catch(err){
		if(debug)
			console.log("Error possibly parsing tree via acorn ast parser."+
						"\nPossible incomplete code written.");
	}
}

//Search for value == keyword in tree
function searchKeyword(entry, keyword)
{
	var entryType = typeof entry;

    //Make sure key: type exists before entering
    if(entryType !== "undefined"){
    	if(entryType == "string" && entry.toLowerCase().indexOf(keyword.toLowerCase()) >=0){
    		
    		if(debug)
    			console.log("Found Expression: " + entry);
    		
    		return true;
    	}
    }

    if(debug)
    	console.log(" entry type: " + entry.type);

    if(entryType == "object" && entry !== null){
    	for(var key in entry){
            // console.log(" entry: " + Object.keys(entry));
            if(searchKeyword(entry[key], keyword)){
                // console.log("entry: " + entry);
                return true;
            }
        }
    }
    return false;
}

//Output array of keywords that should be included in user's code
function whiteList(listOfAccepted)
{
	var doesNotHave = [];
	for(var i = 0; i < listOfAccepted.length; ++i){
		console.log(listOfAccepted[i]);
		var keyword = listOfAccepted[i];

		//Push into array if keyword not found
		if(!searchKeyword(tree.body, keyword)){
			
			if(debug)
				console.log("What is not here: " + keyword);

			doesNotHave.push(keyword);
		}
	}
	return doesNotHave;
}

//Output array of keywords that shouldn't be in user's code
function blackList(listOfRejected)
{
	var has = [];
	for(var i = 0; i < listOfRejected.length; ++i){
		console.log(listOfRejected[i]);
		var keyword = listOfRejected[i];

		//Push into array if found keyword
		if(searchKeyword(tree.body, keyword)){
			
			if(debug)
				console.log("Shouldnt have expression: " + keyword);
			
			has.push(keyword);
		}
	}
	return has;
}

function giveSuggestion(userFormat){

}



function determineKeyWord(keyword){




}

















