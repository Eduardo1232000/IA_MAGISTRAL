function reflex_agent(location, state){
    if (state=="DIRTY") return "CLEAN";  //SI ESTA SUCIO, LO LIMPIA
    else if (location=="A") return "RIGHT"; //(IZQUIERDA) (ESTA LIMPIO) SINO  SE VA A DERECHA
    else if (location=="B") return "LEFT"; //(DERECHA) (ESTA LIMPIO) SINO SE VA A IZQUIERDA
}

function estado_numero(location, states){
  if (location =="A" && states[1]=="DIRTY" && states[2] == "DIRTY") return "1: [A D D] ->";  
  else if (location =="A" && states[1]=="DIRTY" && states[2] == "CLEAN") return "2: [A D C] ->";  
  else if (location =="A" && states[1]=="CLEAN" && states[2] == "DIRTY") return "3: [A C D] ->";  
  else if (location =="A" && states[1]=="CLEAN" && states[2] == "CLEAN") return "4: [A C C] ->"; 
  else if (location =="B" && states[1]=="DIRTY" && states[2] == "DIRTY") return "5: [B D D] ->"; 
  else if (location =="B" && states[1]=="DIRTY" && states[2] == "CLEAN") return "6: [B D C] ->"; 
  else if (location =="B" && states[1]=="CLEAN" && states[2] == "DIRTY") return "7: [B C D] ->"; 
  else if (location =="B" && states[1]=="CLEAN" && states[2] == "CLEAN") return "8: [B C C] ->"; 
}

function test(states){
        //VALIDACION ENSUCIAR
        const randomInteger = Math.floor(Math.random() * 11);
        if(randomInteger >=8 && randomInteger <=10){  // SI SALE 8, 9, 10 SE ENSUCIA
          states[1] = "DIRTY"
          states[2] = "DIRTY"
          document.getElementById("log").innerHTML+= "<br>SE ENSUCIA A Y B"
        }
       var location = states[0];		
       var state = states[0] == "A" ? states[1] : states[2];
       var action_result = reflex_agent(location, state);
       document.getElementById("log").innerHTML+="<br>"+estado_numero(location, states)+" Location: ".concat(location).concat(" | Action: ").concat(action_result);

       if (action_result == "CLEAN"){
         if (location == "A") states[1] = "CLEAN";
          else if (location == "B") states[2] = "CLEAN";
       }
       else if (action_result == "RIGHT") states[0] = "B";
       else if (action_result == "LEFT") states[0] = "A";		
 setTimeout(function(){ test(states); }, 2000);
}

var states = ["A","DIRTY","DIRTY"];
test(states);