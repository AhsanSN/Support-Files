console.log("asdasdasd")

var nFields = 0

for (var i = 0; i <nFields; i++) {
	varI = i+1
	$('#allFields').append('<div class="mt-10"><div class="row"><div class="col-sm-4"><div class="input-group"><input type="number" name="course_'+varI+'" class="form-control" id="exampleInputAmount" placeholder="Course %: '+varI+'"></div></div><div class="col-sm-4"><div class="input-group"><input type="number" class="form-control" name="cr_'+varI+'" id="exampleInputAmount" placeholder="Course CR: ' +varI+'"></div></div></div></div>');
}

$('#btncld').click(function() {
	varI = nFields+1
	$('#allFields').append('<div class="mt-10"><div class="row"><div class="col-sm-4"><div class="input-group"><input type="number" name="course_'+varI+'" class="form-control" id="exampleInputAmount" placeholder="Course %: '+varI+'"></div></div><div class="col-sm-4"><div class="input-group"><input type="number" class="form-control" name="cr_'+varI+'" id="exampleInputAmount" placeholder="Course CR: ' +varI+'"></div></div></div></div>');
	nFields+=1;
});

var isShowing  = false;
function show(){
	$('#allFields').find('input[name="assg_weight"]').show()
	$('#allFields').find('input[name="quiz_weight"]').show()
	$('#allFields').find('input[name="mid_weight"]').show()
	$('#allFields').find('input[name="final_weight"]').show()
	isShowing = true
}

function hide(){
	$('#allFields').find('input[name="assg_weight"]').hide()
	$('#allFields').find('input[name="quiz_weight"]').hide()
	$('#allFields').find('input[name="mid_weight"]').hide()
	$('#allFields').find('input[name="final_weight"]').hide()
	isShowing = false
}

$('#calcGPA').click(function() {
    var a_1 = $('#allFields').find('input[name="assg_total"]').val();
    var a_2 = $('#allFields').find('input[name="assg_weight"]').val();

    var b_1 = $('#allFields').find('input[name="quiz_total"]').val();
    var b_2 = $('#allFields').find('input[name="quiz_weight"]').val();

    var c_1 = $('#allFields').find('input[name="mid_total"]').val();
    var c_2 = $('#allFields').find('input[name="mid_weight"]').val();

    var d_1 = $('#allFields').find('input[name="final_total"]').val();
    var d_2 = $('#allFields').find('input[name="final_weight"]').val();

    var e_1 = $('#parti_total').find(":selected").val();
    var e_2 = $('#allFields').find('input[name="parti_weight"]').val();

    var f_1 = $('#pres_total').find(":selected").val();
    var f_2 = $('#allFields').find('input[name="pres_weight"]').val();

    console.log(a_1, a_2, b_1, b_2,c_1,c_2,d_1,d_2,e_1,e_2,f_1,f_2)

    //caluate score
    console.log("isShowing", isShowing)
    if(isShowing==true){
    	var total = 0
    	var a_3 = (a_1/100)*a_2
    	var b_3 = (b_1/100)*b_2
    	var c_3 = (c_1/100)*c_2
    	var d_3 = (d_1/100)*d_2
    	var e_3 = (getScoreFromPoints_pres_parti(e_1)/100)*e_2
    	var f_3 = (getScoreFromPoints_pres_parti(f_1)/100)*f_2

    	total  =a_3+b_3+c_3+d_3+e_3+f_3
    	wordComments = labelFromOverallScore(total)
    	document.getElementById("gpaBlock").innerHTML = "Student score is "+total.toString().slice(0, 5)+"<br>"+wordComments
		document.getElementById("gpaBlock").style.display = "block"

    }
    if(isShowing==false){
    	var total = 0
    	var a_3 = parseInt(a_1)
    	var b_3 = parseInt(b_1)
    	var c_3 = parseInt(c_1)
    	var d_3 = parseInt(d_1)
    	var e_3 = (getScoreFromPoints_pres_parti(e_1)/100)*e_2
    	var f_3 = (getScoreFromPoints_pres_parti(f_1)/100)*f_2

    	total  =a_3+b_3+c_3+d_3+e_3+f_3
    	wordComments = labelFromOverallScore(total)
    	document.getElementById("gpaBlock").innerHTML = "Student score is "+total.toString().slice(0, 5)+"<br>"+wordComments
		document.getElementById("gpaBlock").style.display = "block"
    }
});

function getScoreFromPoints_pres_parti(points){
	var score=0;
	if(points==1){
		score = 40;
	}
	if(points==2){
		score = 60;
	}
	if(points==3){
		score = 70;
	}
	if(points==4){
		score = 80;
	}
	if(points==5){
		score = 87;
	}
	if(points==6){
		score = 92;
	}
	if(points==7){
		score = 97;
	}
	return score
}


function labelFromOverallScore(point){
	label = ["Really bad", "Below Average","Average", "Good","Really Good","Impressive", "Beyond expectations!"]
	points = [55, 61  , 64.5, 68.5, 72.5, 77.5, 82.5, 87.5, 92.5, 97.5] //x

	
	GPA = 0
	for (var i = 0; i <points.length; i++) {
		
		if(point>points[i] && point<points[i+1] ){

			a=point/(points[i+1]-points[i])
			b = ("Student score is "+label[i]+" at "+a.toString().slice(0, 5)+"% and "+label[i+1]+" at "+(100-a).toString().slice(0, 5)+"%");
			return b
		}
	}
}

//GPAfromPoint(70)

function GPAfromPoint(point){
	label = ["Really bad", "Below Average","Average", "Good","Really Good","Impressive", "Beyond expectations!"]
	points = [55, 61  , 64.5, 68.5, 72.5, 77.5, 82.5, 87.5, 92.5, 97.5] //x
	gpa = 	 [0 , 1.67, 2   , 2.33, 2.67, 3   , 3.33, 3.67, 4   , 4   ] //y

	GPA = 0
	for (var i = 0; i <points.length; i++) {
		
		if(point>points[i] && point<points[i+1] ){

			//first overlap
			m = (gpa[i+1]-0)/(points[i+1]-points[i])
			y = (m*(point - points[i])) + 0
			GPA = y

			//second overlap
			m = (0-gpa[i])/(points[i+1]-points[i])
			y = (m*(point - points[i])) + gpa[i]
			GPA += y
		}
	}
	console.log("point", point, "gpa", GPA)
	return GPA
}


function calculateGPAfromAllCourses(allCourseGrades, crI){

	gpa = 0
	console.log("allCourseGrades", allCourseGrades)
	totalGradePoints = 0
	totalCreditHours = 0
	for (var i = 0; i <nFields; i++) {
		console.log("i", i)
		totalGradePoints+= (allCourseGrades[i] * parseInt(crI[i]))
		totalCreditHours+= parseInt(crI[i])
	}

	gpa = totalGradePoints/totalCreditHours
	console.log("calculated overall GPA", gpa)
	document.getElementById("gpaBlock").innerHTML = "Your GPA is "+gpa
	document.getElementById("gpaBlock").style.display = "block"
}


