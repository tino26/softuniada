// Creating variables
//grid
var gridX=3, gridY=3, gridS=200;
var grid=[];

//images
var xPlayer=new Image();
xPlayer.src="x.png";
var oPlayer=new Image();
oPlayer.src="blue-circle-hi.png";

//other
var turn=0, fullPoleta=0; 
var whoWins=0, start=true, isWon=false;

//wonGames
var myStorage = window.sessionStorage;
var xWonGames=readProgress('xWonGames') || 0;
var oWonGames=readProgress('oWonGames') || 0;

function saveProgress(key, value){
    sessionStorage.setItem(key, value);
}

function readProgress(key){
    var gameSaved = sessionStorage.getItem(key);
    return gameSaved;
}

//grid creation and setting values
for(let x=0; x<gridX; x++){
	grid[x]=[];
	for(let y=0; y<gridY; y++){
		grid[x][y]=0;
	}
}

function update() {
	//winCheck
	if(start==true){
		for(var i=0; i<3; i++){
	        for(var j=0; j<3; j++){
	           	//x
	       	    //sideways
	  	        if(i==0 && grid[i][j]==1){
	                if(grid[i+1][j]==1 && grid[i+2][j]==1){
	                    whoWins=1;
	  		        }
	            }
	            if(i==2 && grid[i][j]==1){
	                if(grid[i-1][j]==1 && grid[i-2][j]==1){
	                    whoWins=1;
	                }
	            }
	            //up and down
	            if(j==0 && grid[i][j]==1){
	                if(grid[i][j+1]==1 && grid[i][j+2]==1){
	                    whoWins=1;
	                }
	            }
	            if(i==2 && grid[i][j]==1){
	                if(grid[i][j-1]==1 && grid[i][j-2]==1){
	                    whoWins=1;
	                }
	            }
	            //diagonal
	            if(i==0 && j==0 && grid[i][j]==1){
	                if(grid[i+1][j+1]==1 && grid[i+2][j+2]==1){
	                    whoWins=1;
	                }
	            }
	            if(i==2 && j==2 && grid[i][j]==1){
	                if(grid[i-1][j-1]==1 && grid[i-2][j-2]==1){
	                    whoWins=1;
	                }
	            }
	            if(i==2 && j==0 && grid[i][j]==1){
	                if(grid[i-1][j+1]==1 && grid[i-2][j+2]==1){
	                    whoWins=1;
	           	    }
	            }
	            if(i==0 && j==2 && grid[i][j]==1){
	                if(grid[i+1][j-1]==1 && grid[i+2][j-2]==1){
	                    whoWins=1;
	                }
                }



	            //o
	            //sideways
	            if(i==0 && grid[i][j]==2){
	                if(grid[i+1][j]==2 && grid[i+2][j]==2){
	                    whoWins=2;
	                }
	            }
	            if(i==2 && grid[i][j]==2){
	                if(grid[i-1][j]==2 && grid[i-2][j]==2){
                    	whoWins=2;
                    }
                }
                //up and down
                if(j==0 && grid[i][j]==2){
                    if(grid[i][j+1]==2 && grid[i][j+2]==2){
                        whoWins=2;
                    }
                }
                if(i==2 && grid[i][j]==2){
                    if(grid[i][j-1]==2 && grid[i][j-2]==2){
                        whoWins=2;
                    }
                }
                //diagonal
                if(i==0 && j==0 && grid[i][j]==2){
                    if(grid[i+1][j+1]==2 && grid[i+2][j+2]==2){
                        whoWins=2;
                    }
                }
                if(i==2 && j==2 && grid[i][j]==2){
                    if(grid[i-1][j-1]==2 && grid[i-2][j-2]==2){
                        whoWins=2;
                    }
                }
                if(i==2 && j==0 && grid[i][j]==2){
                    if(grid[i-1][j+1]==2 && grid[i-2][j+2]==2){
                        whoWins=2;
                    }
                }
                if(i==0 && j==2 && grid[i][j]==2){
                    if(grid[i+1][j-1]==2 && grid[i+2][j-2]==2){
                        whoWins=2;
                    }
                }
            }
        }
    }


	//points
    if(start==true){
    	if(whoWins==1 && start==true){
    		xWonGames++;
    		saveProgress('xWonGames', xWonGames);
    		start=false;
    	}

    	if(whoWins==2 && start==true){
    		oWonGames++;
    		saveProgress('oWonGames', oWonGames);
    		start=false;
    	}

    	if(fullPoleta>=9){
			start=false;
		}
	}

	if(fullPoleta>=9){
		start=false;
	}

}

function draw() {
    // This is how you draw a rectangle
    context.fillStyle="black";
    context.fillRect(0, 0, canvas.width, canvas.height);
    for(let x=0; x<gridX; x++){
    	for(let y=0; y<gridY; y++){
    		context.strokeStyle="white";
    		context.strokeRect(canvas.width/2-gridS*1.5+gridS*x, canvas.height/2-gridS*1.5+gridS*y, gridS, gridS);
    		if(grid[x][y]==1){
                context.drawImage(xPlayer, canvas.width/2-gridS*1.5+gridS*x, canvas.height/2-gridS*1.5+gridS*y, gridS, gridS);
            }
            if(grid[x][y]==2){
                context.drawImage(oPlayer, canvas.width/2-gridS*1.5+gridS*x+5, canvas.height/2-gridS*1.5+gridS*y+5, gridS-10, gridS-10);
            }
    	}
    }


    context.fillStyle="white";
    context.font="60px Arial";
    context.fillText("Player 1:", 40, 100, 220);
    context.fillText(xWonGames, 280, 100, 220);
    context.fillText("Player 2:", canvas.width-340, 100, 220);
    context.fillText(oWonGames, canvas.width-100, 100, 220);

    if(fullPoleta>=9 && whoWins==0){
    	context.fillStyle="white";
    	context.font="80px Arial";
    	context.fillText("A draw!", window.innerWidth/2-160, canvas.height/2, 550);
    }

    if(start==false){
    	if(whoWins!=0){
    		for(let x=0; x<gridX; x++){
    			for(let y=0; y<gridY; y++){

    				if(whoWins==1){
			    		if(x==0 && grid[x][y]==1){
			               	if(grid[x+1][y]==1 && grid[x+2][y]==1){
		               			context.lineWidth=10;
		                    	context.beginPath();
		                   	 	context.moveTo(canvas.width/2-gridS*1.5+gridS*x, canvas.height/2+gridS*(y-1));
		                    	context.lineTo(canvas.width/2-gridS*1.5+gridS*3, canvas.height/2+gridS*(y-1));
		                    	context.stroke();
		                    	context.lineWidth=1;
			  		        }
				        }

			            if(y==0 && grid[x][y]==1){
			                if(grid[x][y+1]==1 && grid[x][y+1]==1){
			                    context.lineWidth=10;
			                    context.beginPath();
			                    context.moveTo(canvas.width/2+gridS*(x-1), canvas.height/2-gridS*1.5+gridS*y);
			                    context.lineTo(canvas.width/2+gridS*(x-1), canvas.height/2-gridS*1.5+gridS*3);
			                    context.stroke();
			                    context.lineWidth=1;
			                }
			            }

			            //diagonal
			            if(x==0 && y==0 && grid[x][y]==1){
			                if(grid[x+1][y+1]==1 && grid[x+2][y+2]==1){
			                    context.lineWidth=10;
			                    context.beginPath();
			                    context.moveTo(canvas.width/2+gridS*(x-1)-0.5*gridS, canvas.height/2-gridS+gridS*(y-0.5));
			                    context.lineTo(canvas.width/2+gridS*(x+1)+0.5*gridS, canvas.height/2-gridS+gridS*2.5);
			                    context.stroke();
			                    context.lineWidth=1;
			                }
			            }
			
			            if(x==2 && y==0 && grid[x][y]==1){
			                if(grid[x-1][y+1]==1 && grid[x-2][y+2]==1){
			                    context.lineWidth=10;
			                    context.beginPath();
			                    context.moveTo(canvas.width/2+gridS*(x+1)+0.5*gridS-gridS*2, canvas.height/2-gridS+gridS*(y-0.5));
			                    context.lineTo(canvas.width/2+gridS*(x-1)-0.5*gridS-gridS*2, canvas.height/2-gridS+gridS*2.5);
			                    context.stroke();
			                    context.lineWidth=1;
			           	    }
			            }
		        	}



		        	if(whoWins==2){
			            if(x==0 && grid[x][y]==2){
			               	if(grid[x+1][y]==2 && grid[x+2][y]==2){
			               		context.lineWidth=10;
			                    context.beginPath();
			                    context.moveTo(canvas.width/2-gridS*1.5+gridS*x, canvas.height/2+gridS*(y-1));
			                    context.lineTo(canvas.width/2-gridS*1.5+gridS*3, canvas.height/2+gridS*(y-1));
			                    context.stroke();
			                    context.lineWidth=1;
			  		        }
				        }

			            if(y==0 && grid[x][y]==2){
			                if(grid[x][y+1]==2 && grid[x][y+1]==2){
			                    context.lineWidth=10;
			                    context.beginPath();
			                    context.moveTo(canvas.width/2+gridS*(x-1), canvas.height/2-gridS*1.5+gridS*y);
			                    context.lineTo(canvas.width/2+gridS*(x-1), canvas.height/2-gridS*1.5+gridS*3);
			                    context.stroke();
			                    context.lineWidth=1;
			                }
			            }

			            //diagonal
			            if(x==0 && y==0 && grid[x][y]==2){
			                if(grid[x+1][y+1]==2 && grid[x+2][y+2]==2){
			                    context.lineWidth=10;
			                    context.beginPath();
			                    context.moveTo(canvas.width/2+gridS*(x-1)-0.5*gridS, canvas.height/2-gridS+gridS*(y-0.5));
			                    context.lineTo(canvas.width/2+gridS*(x+1)+0.5*gridS, canvas.height/2-gridS+gridS*2.5);
			                    context.stroke();
			                    context.lineWidth=1;
			                }
			            }
			
			            if(x==2 && y==0 && grid[x][y]==2){
			                if(grid[x-1][y+1]==2 && grid[x-2][y+2]==2){
			                    context.lineWidth=10;
			                    context.beginPath();
			                    context.moveTo(canvas.width/2+gridS*(x+1)+0.5*gridS-gridS*2, canvas.height/2-gridS+gridS*(y-0.5));
			                    context.lineTo(canvas.width/2+gridS*(x-1)-0.5*gridS-gridS*2, canvas.height/2-gridS+gridS*2.5);
			                    context.stroke();
			                    context.lineWidth=1;
			           	    }
			            }
		        	}

		            
		        }
		    }
    	}
    }

};

function keyup(key) {
    // Show the pressed keycode in the console
    console.log("Pressed", key);
};

function mouseup() {
    // Show coordinates of mouse on click
    console.log("Mouse clicked at", mouseX, mouseY);
    if(start==true){
	    for(var x=0; x<3; x++){
	        for(var y=0; y<3; y++){
	            if(areColliding(canvas.width/2-gridS*1.5+gridS*x, canvas.height/2-gridS*1.5+gridS*y, gridS, gridS, mouseX, mouseY, 1, 1)){
	                if(grid[x][y]==0){
	                    if(turn==0){
	                        grid[x][y]=1;
	                        turn=1;
	                        fullPoleta++;
	                    }else{
	                        grid[x][y]=2;
	                        turn=0;
	                        fullPoleta++;
	                    }
	                }
	            }
	        }
	    }
	}
};
