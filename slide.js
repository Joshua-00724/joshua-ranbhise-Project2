var clear;
var Number_of_moves;
var win=false;
var time=0;
var tileId=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
window.addEventListener("load",startTimer,false);

function begin()
{
	Number_of_moves=0;
	win=false;

	for(var i=0;i<16;i++)
	{
		var temp=document.getElementById(i);
		temp.className="cell";i
	}
	randomNumber=tileId.sort(function(){return (Math.round(Math.random())-0.5)});
	while(!Problem.prototype.is_solvable(randomNumber))
	{
		randomNumber=tileId.sort(function(){return (Math.round(Math.random())-0.5)});
	}
	for(var i=0;i<16;i++)
	{
		var temp=document.getElementById(i);
		if(randomNumber[i]==16)
		{
			temp.className="cell clear";
			temp.innerHTML="";
			clear=i;
		}
		else
			temp.innerHTML=randomNumber[i];
	}
}

function Click(x)
{
	if(win)
		return;
	if(x.id!=clear+'')
	{
		var clear_row=Math.floor(clear/4);
		var clear_col=clear%4;
		var selectId=Number(x.id);
		var select_row=Math.floor(selectId/4);
		var select_col=selectId%4;

		if((Math.abs(clear_row - select_row) == 1 && clear_col== select_col) || (Math.abs(clear_col - select_col)==1 && clear_row==select_row))
		{
			document.getElementById(clear).className="cell";
			document.getElementById(clear).innerHTML=x.innerHTML;
			x.className="cell clear";
			x.innerHTML='';

			clear=selectId;
			Number_of_moves++;
			document.getElementById("moves").innerHTML="Number of Moves thus far:" + Number_of_moves;
		
		if(isDone())
		{
			win=true;
			document.getElementById("moves").innerHTML="CONGRATULATIONS!! , you took " + Number_of_moves + " move(s) to complete this game";  
			if(confirm("CONGRATULATIONS\n You have successfully reordered the puzzle numbers in sequential order\nNumber of moves it took to complete: " + Number_of_moves + "\nWould you like to play again?"))
				window.location.reload();

		}
		}
	}
}

function simplegame()
{
	if(win)
	{
		window.location.reload();
	}
	time=0;
	Number_of_moves=0;
	document.getElementById("moves").innerHTML="Number of Moves thus far:" + Number_of_moves;
	for(var i=0;i<16;i++)
	{
		var temp=document.getElementById(i);
		if(i==14)
		{
			temp.className="cell clear";
			temp.innerHTML="";
			clear=i;
		}
		else if(i==15)
		{
			temp.className="cell";
			temp.innerHTML="15";
		}
		else
		{
			temp.innerHTML=i+1;
			temp.className="cell";
		}
	}
}

function lastClick()
{
	var cur_state=currentState();
	var problem=new Problem(cur_state);
	var sol=Solver.a_star_search(problem);
	var result="<ol>";
	for(var i=0;i<sol.length;i++)
	{
		var n= moveNumb(sol[i],cur_state);
		cur_state=problem.result(sol[i],cur_state);
		result += "<li>move"+n+ "</li>";
	} 
	result += "</ol>";
	document.getElementById("steps").innerHTML=result;
}

function currentState()
{
	var result=[];
	for(var i=0;i<16;i++)
	{
		var temp=document.getElementById(String(i)).innerHTML;
		if(temp=='')
		{
			result[i]=16;

		}
		else
		{
			result[i]=Number(temp);
		}
	}
return result;
}

Array.prototype.clone=function(){return this.slice(0);};
Array.prototype.swap=function(i1,i2)
{
	var copy=this.clone();
	var temp=copy[i1];
	copy[i1]=copy[i2];
	copy[i2]=temp;
	return copy;
};

var Problem=function(start_state)
{
	this.init_state=start_state;
	return this;
}

Problem.prototype.is_solvable=function(begin)
{
	begin=begin.clone();   begin.splice(begin.indexOf(16),1);
	begin[15]=16;
	var count=0;
	for(var i=0;i<15;i++)
	{
		if(begin[i]!=i+1)
		{
			count++;
			var j=begin.indexOf(i+1);
			begin[j]=begin[i];
			begin[i]=i+1;
		

		}
	}
	return count % 2 == 0;
	}

	function isDone()
	{
		return document.getElementById('0').innerHTML == '1' &&
        document.getElementById('1').innerHTML == '2' &&
        document.getElementById('2').innerHTML == '3' &&
        document.getElementById('3').innerHTML == '4' &&
        document.getElementById('4').innerHTML == '5' &&
        document.getElementById('5').innerHTML == '6' &&
        document.getElementById('6').innerHTML == '7' &&
        document.getElementById('7').innerHTML == '8' &&
        document.getElementById('8').innerHTML == '9' &&
        document.getElementById('9').innerHTML == '10' &&
        document.getElementById('10').innerHTML == '11' &&
        document.getElementById('11').innerHTML == '12' &&
        document.getElementById('12').innerHTML == '13' &&
        document.getElementById('13').innerHTML == '14' &&
        document.getElementById('14').innerHTML == '15';
	}

	function startTimer()
	{
		window.setInterval("updateTime()",1000);
	}

	function updateTime()
	{
		++time;
		document.getElementById("time").innerHTML="Time spent in the current game: " +time;
	}
	