
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
			console.log(JSON.stringify(tree));
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

    //Make sure entry is not undefined and is type string
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




// function giveSuggestion(userFormat){






// }



// function determineKeyWord(keyword){




// }

// console.log(testTree.body[0].type);

console.log(typeof acorn.walk.ancestor(testTree.body[0], {
	Expression: function(node){
		console.log("Expression");
		console.log(node);
		console.log("\n");
		// console.log(typeof acorn.walk.node2);

	},
	Statement: function(node){console.log("Statement");console.log(node);console.log("\n");},
	ScopeBody: function(node){console.log(node)}
}));
console.log(acorn._slash);
// console.log(acorn.walk._if[keyword]);



var testTree =  {
  "type": "Program",
  "start": 0,
  "end": 218,
  "body": [
    {
      "type": "ForStatement",
      "start": 0,
      "end": 166,
      "init": {
        "type": "VariableDeclaration",
        "start": 4,
        "end": 13,
        "declarations": [
          {
            "type": "VariableDeclarator",
            "start": 8,
            "end": 13,
            "id": {
              "type": "Identifier",
              "start": 8,
              "end": 9,
              "name": "i"
            },
            "init": {
              "type": "Literal",
              "start": 12,
              "end": 13,
              "value": 0,
              "raw": "0"
            }
          }
        ],
        "kind": "var"
      },
      "test": {
        "type": "BinaryExpression",
        "start": 15,
        "end": 21,
        "left": {
          "type": "Identifier",
          "start": 15,
          "end": 16,
          "name": "i"
        },
        "operator": "<",
        "right": {
          "type": "Literal",
          "start": 19,
          "end": 21,
          "value": 23,
          "raw": "23"
        }
      },
      "update": {
        "type": "UpdateExpression",
        "start": 23,
        "end": 26,
        "operator": "++",
        "prefix": true,
        "argument": {
          "type": "Identifier",
          "start": 25,
          "end": 26,
          "name": "i"
        }
      },
      "body": {
        "type": "BlockStatement",
        "start": 27,
        "end": 166,
        "body": [
          {
            "type": "ForStatement",
            "start": 33,
            "end": 91,
            "init": {
              "type": "VariableDeclaration",
              "start": 37,
              "end": 45,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 41,
                  "end": 45,
                  "id": {
                    "type": "Identifier",
                    "start": 41,
                    "end": 42,
                    "name": "j"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 44,
                    "end": 45,
                    "value": 0,
                    "raw": "0"
                  }
                }
              ],
              "kind": "var"
            },
            "test": {
              "type": "BinaryExpression",
              "start": 47,
              "end": 53,
              "left": {
                "type": "Identifier",
                "start": 47,
                "end": 48,
                "name": "j"
              },
              "operator": "<",
              "right": {
                "type": "Literal",
                "start": 51,
                "end": 53,
                "value": 25,
                "raw": "25"
              }
            },
            "update": {
              "type": "UpdateExpression",
              "start": 55,
              "end": 58,
              "operator": "++",
              "prefix": true,
              "argument": {
                "type": "Identifier",
                "start": 57,
                "end": 58,
                "name": "j"
              }
            },
            "body": {
              "type": "BlockStatement",
              "start": 59,
              "end": 91,
              "body": [
                {
                  "type": "ExpressionStatement",
                  "start": 69,
                  "end": 85,
                  "expression": {
                    "type": "CallExpression",
                    "start": 69,
                    "end": 84,
                    "callee": {
                      "type": "MemberExpression",
                      "start": 69,
                      "end": 80,
                      "object": {
                        "type": "Identifier",
                        "start": 69,
                        "end": 76,
                        "name": "console"
                      },
                      "property": {
                        "type": "Identifier",
                        "start": 77,
                        "end": 80,
                        "name": "log"
                      },
                      "computed": false
                    },
                    "arguments": [
                      {
                        "type": "Literal",
                        "start": 81,
                        "end": 83,
                        "value": 23,
                        "raw": "23"
                      }
                    ]
                  }
                }
              ]
            }
          },
          {
            "type": "ForStatement",
            "start": 96,
            "end": 150,
            "init": {
              "type": "VariableDeclaration",
              "start": 100,
              "end": 109,
              "declarations": [
                {
                  "type": "VariableDeclarator",
                  "start": 104,
                  "end": 109,
                  "id": {
                    "type": "Identifier",
                    "start": 104,
                    "end": 105,
                    "name": "k"
                  },
                  "init": {
                    "type": "Literal",
                    "start": 108,
                    "end": 109,
                    "value": 0,
                    "raw": "0"
                  }
                }
              ],
              "kind": "var"
            },
            "test": {
              "type": "BinaryExpression",
              "start": 111,
              "end": 117,
              "left": {
                "type": "Identifier",
                "start": 111,
                "end": 112,
                "name": "k"
              },
              "operator": "<",
              "right": {
                "type": "Literal",
                "start": 115,
                "end": 117,
                "value": 26,
                "raw": "26"
              }
            },
            "update": {
              "type": "UpdateExpression",
              "start": 119,
              "end": 122,
              "operator": "++",
              "prefix": true,
              "argument": {
                "type": "Identifier",
                "start": 121,
                "end": 122,
                "name": "k"
              }
            },
            "body": {
              "type": "BlockStatement",
              "start": 123,
              "end": 150,
              "body": [
                {
                  "type": "VariableDeclaration",
                  "start": 133,
                  "end": 144,
                  "declarations": [
                    {
                      "type": "VariableDeclarator",
                      "start": 137,
                      "end": 143,
                      "id": {
                        "type": "Identifier",
                        "start": 137,
                        "end": 138,
                        "name": "k"
                      },
                      "init": {
                        "type": "Literal",
                        "start": 141,
                        "end": 143,
                        "value": 23,
                        "raw": "23"
                      }
                    }
                  ],
                  "kind": "var"
                }
              ]
            }
          },
          {
            "type": "ExpressionStatement",
            "start": 155,
            "end": 164,
            "expression": {
              "type": "CallExpression",
              "start": 155,
              "end": 163,
              "callee": {
                "type": "Identifier",
                "start": 155,
                "end": 160,
                "name": "funct"
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 161,
                  "end": 162,
                  "name": "i"
                }
              ]
            }
          }
        ]
      }
    },
    {
      "type": "FunctionDeclaration",
      "start": 168,
      "end": 218,
      "id": {
        "type": "Identifier",
        "start": 177,
        "end": 182,
        "name": "funct"
      },
      "params": [
        {
          "type": "Identifier",
          "start": 183,
          "end": 184,
          "name": "i"
        }
      ],
      "body": {
        "type": "BlockStatement",
        "start": 185,
        "end": 218,
        "body": [
          {
            "type": "ExpressionStatement",
            "start": 196,
            "end": 211,
            "expression": {
              "type": "CallExpression",
              "start": 196,
              "end": 210,
              "callee": {
                "type": "MemberExpression",
                "start": 196,
                "end": 207,
                "object": {
                  "type": "Identifier",
                  "start": 196,
                  "end": 203,
                  "name": "console"
                },
                "property": {
                  "type": "Identifier",
                  "start": 204,
                  "end": 207,
                  "name": "log"
                },
                "computed": false
              },
              "arguments": [
                {
                  "type": "Identifier",
                  "start": 208,
                  "end": 209,
                  "name": "i"
                }
              ]
            }
          }
        ]
      },
      "expression": false
    }
  ]
};
















