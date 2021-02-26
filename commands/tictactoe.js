module.exports = {
    name: 'tictactoe',
    args: '[position]',
    aliases: ['ttt','gametic'],
    description: 'The Tic Tac Toe Game',
    argsDescription: {
        '[position]': '(optional) the position of the next turn, if "new" or empty it resets the game, if "history" it shows the win history'
    },
    execute(message, args, client, result) {
        const position = args.shift();
        if(position=="new" || typeof position == 'undefined'){
            client.tictactoegameboard=[];
            client.tictactoegameboardturn = 'x';
            result += ("├► Starting new tic-tac-toe game")+ "\n";
           
            result += designBoard(client.tictactoegameboard);
            result += "└► It is "+client.tictactoegameboardturn + " turn";
        }else if(position == "history"){
            for (var element in client.tictactoegameboardwins) {
                result += ("├► "+element[1] +":" + element[2]+" wins")+ "\n";
            }
            result += "└► End";
        }
        else if(!Number.isNaN(position)){
            if(typeof client.tictactoegameboard[parseInt(position)-1]!="undefined"){
                result += designBoard(client.tictactoegameboard);
                result += "\""+client.tictactoegameboard[parseInt(position)-1]+"\"";
                result += ("└► Position ocupied, please don't cheat") + "\n";    
                return result;
            }else if(parseInt(position)<1 || parseInt(position)>9){
                result += designBoard(client.tictactoegameboard);
                result += ("└► Invalid position : "+position) + "\n";    
                return result;
            }
            client.tictactoegameboard[parseInt(position)-1]=client.tictactoegameboardturn;
            client.tictactoegameboardturn = (client.tictactoegameboardturn=='x')?'o':'x';
            result += designBoard(client.tictactoegameboard);
            let winConditions = hasSomeoneWonOrPositionsAllFilled(client.tictactoegameboard);
            if(winConditions[0]==true){
                if(winConditions[1]=="Tie"){
                    result += "└► The Game ended in a tie :(";

                }else{
                    let user = message.member.user;
                    client.tictactoegameboardwins[user.id]=[user.id,
                                                            user.username+"#"+user.discriminator,
                                                            (typeof client.tictactoegameboardwins[user.id]=="undefined")?
                                                                1:client.tictactoegameboardwins[user.id][2]+1
                                                            ];
                    result += "└► The Game ended : " + user.username + " " + winConditions[1];
                }
            }else{
                result += "└► It is "+client.tictactoegameboardturn + " turn";
            }
        }else{
            result += ("└► Command not recognized : " + position) + "\n";
        }
        
        return result;
    }
}
function designBoard(boardarray){
    let result="";
    result += ("├► ----------------------\n");
    for (let i = 0; i < 3; i++) {
        result += ("├► ");
        for (let j = 0; j < 3; j++) {
            const element = boardarray[j+i*3]||"      ";

            result += ("|  "+((element=="      ")?"      ":((element=="x")?":negative_squared_cross_mark:":":o2:"))+"  ");
        }
        result += ("|\n├► ----------------------\n");
    }
    return result;
}
function hasSomeoneWonOrPositionsAllFilled(boardArray){
    for (let i = 0; i < 3; i++) {
        if(boardArray[i*3]==boardArray[i*3+1] && boardArray[i*3]==boardArray[i*3+2]){
            if(boardArray[i*3]=='o'){
                return [true,"O won"]
            }else if(boardArray[i*3]=='x'){
                return [true,"X won"]
            }
        }
        if(boardArray[i]==boardArray[i+3] && boardArray[i]==boardArray[i+6]){
            if(boardArray[i]=='o'){
                return [true,"O won"]
            }else if(boardArray[i]=='x'){
                return [true,"X won"]
            }
        }
    }
    if(boardArray[0]==boardArray[4] && boardArray[0]==boardArray[8]){
        if(boardArray[0]=='o'){
            return [true,"O won"]
        }else if(boardArray[0]=='x'){
            return [true,"X won"]
        }
    }
    if(boardArray[2]==boardArray[4] && boardArray[2]==boardArray[6]){
        if(boardArray[2]=='o'){
            return [true,"O won"]
        }else if(boardArray[2]=='x'){
            return [true,"X won"]
        }
    }
    let isFilled = 1;
    boardArray.forEach(element => {
        if(element == "o" || element == "x"){
            isFilled ++;
        }

    });
    if(isFilled==9){
        return [true,"Tie"]
    }
    return [false,""]
    
   
}