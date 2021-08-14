var ball,database,position;

function setup(){
    createCanvas(500,500);

    database=firebase.database();

    ball = createSprite(250,250,10,10);    
    ball.shapeColor = "red";
    
    //.ref() is  used to create reference to the location of database value
    var ballPosition=database.ref('ball/position');
    //.on() is used to create listener  which keeps listening to the changes in the database
    ballPosition.on("value",readPosition,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

//writing back to database
function changePosition(x,y){
    //.set() is used to set values to the database
    database.ref('ball/position').set({
        //database x and y keys
        'x': position.x+x,
        'y': position.y+y
    })
             
}


function readPosition(data) {
 //.val() is used retrieve data from the database
 position = data.val();
 console.log(position);

 ball.x=position.x;
 ball.y=position.y;
 console.log(ball.y); 
 console.log(ball.x);
}

function showError(){
    console.log("cannot read database")
}