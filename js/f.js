// JavaScript Document
function test(){
    alert('f is loaded');
    
}

function pf(what, value){ // phone filter ------------------------------------------------------
	var vl = value.length;
	var keep = new Array('0','1','2','3','4','5','6','7','8','9');
	var kc = keep.length;
	var x = 0;
	var filter = "";
	while(x<vl){
		var i = 0;
		while(i<kc){
			if(value.substr(x,1)==keep[i]){ filter += keep[i];}
			i++;
			}
		x++;
	}
	var fl = filter.length; var y = 0; var position = new Array();
	while(y<fl){
		position[y] = filter.substr(y,1);
		y++;
		}
	var reformat = "";
	if(fl>0){reformat+="("+position[0];}
	if(fl>1){reformat+=position[1];}
	if(fl>2){reformat+=position[2];}
	if(fl>3){reformat+=")"+position[3];}
	if(fl>4){reformat+=position[4];}
	if(fl>5){reformat+=position[5];}
	if(fl>6){reformat+="-"+position[6];}
	if(fl>7){reformat+=position[7];}
	if(fl>8){reformat+=position[8];}
	if(fl>9){reformat+=position[9];}
	document.getElementById(what).value=reformat;
}
//---------------------------------------------------------------------------------------------
function just_num(input){ //JUST NUMBERS WILL BE RETURNED
    //alert('open');
        var output = "";
        var inp = input.toString(); var temp = ""; var temp2 = "";
        var coun = inp.length;
        var keep = new Array('1','2','3','4','5','6','7','8','9','0');
        var keepcoun = keep.length;
        var x = 0;
        while(x<coun){
            var y = 0;
            temp = inp.substring(x,x+1);
            while(y<=keepcoun){
                temp2 = keep[y];
                if(temp==temp2){output += temp;}
                y++;
            }
            
            x++;
        }
        /**/
        return output;
    
}
function cnf(what, value1, cases){ // case change and numbers ---------------------------------------
	//what = element id
        //value1 = value of element
        //possible cases = l,u,n (lowercase,uppercase,none)
        
        var c;
        if(cases){ c = cases;}
        else { c = "n";}
        //alert('here');
        var value = String(value1);
	var vl = value.length;
	var keep = new Array('0','1','2','3','4','5','6','7','8','9',
	'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',
	'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','_'); 
	var kc = keep.length;
	var x = 0;
	var filter = "";
	while(x<vl){
		var i = 0;
		while(i<kc){
			if(value.substr(x,1)==keep[i]){ filter += keep[i];}
			i++;
			}
		x++;
	}
	var fl = filter.length; var y = 0; var position = new Array();
	while(y<fl){
		position[y] = filter.substr(y,1);
		y++;
		}
	var reformat = ""; var u = 0;
	while(u<y){
		reformat += position[u];
		u++;
		}
        if(c=="l"){ reformat = reformat.toLowerCase();}
        else if(c=="u"){reformat = reformat.toUpperCase();}
        else if(c=="n"){reformat = reformat;}
        
	document.getElementById(what).value = reformat;
}
//---------------------------------------------------------------------------------------------
function ef(what, value1){ //email filter -----------------------------------------------------
	var value = value1.toUpperCase();
	var vl = value.length;
	var keep = new Array('0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','-','@','.','_');
	var kc = keep.length;
	var x = 0;
	var filter = "";
	while(x<vl){
		var i = 0;
		while(i<kc){
			if(value.substr(x,1)==keep[i]){ filter += keep[i];}
			i++;
			}
		x++;
	}
	var fl = filter.length; var y = 0; var position = new Array();
	while(y<fl){
		position[y] = filter.substr(y,1);
		y++;
		}
	var reformat = ""; var u = 0;
	while(u<y){
		reformat += position[u];
		u++;
		}
	reformat = reformat.toLowerCase();
	document.getElementById(what).value = reformat;
}
//---------------------------------------------------------------------------------------------
function num_(input,id){ //JUST NUMBERS WILL BE TAKEN AND PLACED BACK INTO THE value OF THE GIVEN ID
    //alert('hey');
    //input is the actual value
    //id is the id of the element
    //pre = what to prepend to the ID name for output
    //alert('open');
        var output = "";
        var inp = input.toString(); var temp = ""; var temp2 = "";
        var coun = inp.length;
        var keep = new Array('1','2','3','4','5','6','7','8','9','0');
        var keepcoun = keep.length;
        var x = 0;
        while(x<coun){
            var y = 0;
            temp = inp.substring(x,x+1);
            while(y<=keepcoun){
                temp2 = keep[y];
                if(temp==temp2){output += temp;}
                y++;
            }
            
            x++;
        }
        var item = id;
        document.getElementById(item).value = output;
        
    
}
function text_(input,id,ccase){ //JUST NUMBERS WILL BE TAKEN AND PLACED BACK INTO THE value OF THE GIVEN ID
    //alert('hey');
    //input is the actual value
    //id is the id of the element
    //alert('open');
        var output = "";
        var inp = input.toString(); var temp = ""; var temp2 = "";
        var coun = inp.length;
            var keep = new Array('A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',' ');
        var keepcoun = keep.length;
        var x = 0;
        while(x<coun){
            var y = 0;
            temp = inp.substring(x,x+1);
            while(y<=keepcoun){
                temp2 = keep[y];
                if(temp==temp2){output += temp;}
                y++;
            }
            
            x++;
        }
        var item = id;
        if(ccase=="l"){ output = output.toLowerCase();}
        if(ccase=="u"){ output = output.toUpperCase();}
        
        document.getElementById(item).value = output;
        
    
}