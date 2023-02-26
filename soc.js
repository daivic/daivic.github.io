const coursesEl = document.querySelector(".courselist");
const savedEl = document.querySelector(".saved");
const enrolledEl = document.querySelector(".enrolled");
const mapEl = document.querySelector(".mapclass");
const modalEl = document.querySelector(".modalholder");

function renderCourses(){
    var result = "<input  type=\"text\" id=\"socInput\" onkeyup=\"socFunction()\" placeholder=\"Search class by name\" title=\"Type in a name\" >"
    result += "<table id=\"socTable\">";
    result += "<tr>";
    result += "<th WIDTH=75>Code</th>";
    result += "<th>Course</th>";
    result += "<th>Name</th>";

    result += "<th>School</th>";

    result += "<th>Professor</th>";
    result += "<th>Building</th>";
    result += "<th>Units</th>";
    result += "<th>Time</th>";
    result += "</tr>";
    courses.forEach( (course) => {
        // result += "<tr style= \"cursor:pointer;\" onclick = 'addToSaved(" + JSON.stringify(course) + ")'>";
        
        result += "<td><button class='addsave-button' onclick = 'addToSaved(" + JSON.stringify(course) + ")'><i class='fa fa-bookmark'></i> </button> "+course.code+"</td>";
        result += "<td>"+course.name+"</td>";
        result += "<td>"+course.title+"</td>";
        result += "<td>"+course.school+"</td>";
        result += "<td>"+course.instructor+"</td>";

        /*result += "<td class = 'popupbox'>"+course.instructor+"<span class = 'details'>";
        if (course.instructor == "STAFF") {
            result += "Professor Not Found";
        } else {
            result += "<img src='download.png' alt='Doughnut' width='100' height='100'>";
        }*/

        result += "</td>";
        result += "<td>"+course.building+"</td>";
        result += "<td>"+course.units+"</td>";
        result += "<td>"+course.time+"</td>";


        result += "</tr>";
        
         
    });
    result += "</table>";

    coursesEl.innerHTML = result;
    
}
let allClasses = [];
let saved = [];
let enrolled = [];

function addToSaved(course){
    if (saved.some((othercourse) => othercourse.code === course.code)) {

        modalEl.innerHTML = "<div class=\"modal\" style =\"animation: fadeout 2s;animation-delay: 1s;animation-fill-mode: forwards;  border: solid 2px rgb(128, 0, 0);background: rgba(239, 202, 203, 0.7);\">Error: Cannot save class "+ course.code +" twice.</div>";

    }else if(enrolled.some((othercourse) => othercourse.code === course.code)){
        modalEl.innerHTML = "<div class=\"modal\" style =\"animation: fadeout 2s;animation-delay: 1s;animation-fill-mode: forwards;  border: solid 2px rgb(128, 0, 0);background: rgba(239, 202, 203, 0.7);\">Error: Cannot save class "+ course.code +" because it is in your enrolled.</div>";
    }
    else {
        saved.push(course);
        allClasses.push(course);
        renderSaved();
        modalEl.innerHTML = "<div class=\"modal\" style =\"animation: fadeout 2s;animation-delay: 1s;animation-fill-mode: forwards;\">Saved "+ course.name +"</div>";

        
    }
}

//REMOVE A SAVED CLASS
function removeFromSaved(course){
    i = 0;
        index = 0;
        saved.forEach(c => {
            if (c.code == course.code){
                index = i;
            }
            i ++;
        });
        saved.splice(index, 1);
        renderSaved();
        if(enrolled.includes(course)){

        } 
        else{
            modalEl.innerHTML = "<div class=\"modal\" style =\"animation: fadeout 2s;animation-delay: 1s;animation-fill-mode: forwards;  border: solid 2px rgb(128, 0, 0);background: rgba(239, 202, 203, 0.7);\">Removed "+ course.name +" from saved.</div>";

        }

}


function removeFromEnrolled(course){
        i = 0;
        index = 0;
        enrolled.forEach(c => {
            if (c.code == course.code){
                index = i;
            }
            i ++;
        });
        enrolled.splice(index, 1);
        renderEnrolled();
        modalEl.innerHTML = "<div class=\"modal\" style =\"animation: fadeout 2s;animation-delay: 1s;animation-fill-mode: forwards;  border: solid 2px rgb(128, 0, 0);background: rgba(239, 202, 203, 0.7);\">Unenrolled from "+ course.name +".</div>";
        removeMarker(course.code);  
        deleteClass(course.code);
}


function renderSaved(){

    if(saved.length === 0){
        savedEl.innerHTML = "<div id = 'empty'> No saved classes.</div>";
        return;
    }
    var result = "<table style=\"border-bottom: none;\">";
    saved.forEach( (course) => {

        
        result += "<td>"+course.code+"</td>";
        result += "<td>"+course.title+"</td>";

        result += "<td>"+course.school+"</td>";
        result += "<td>"+course.instructor+"</td>";
        result += "<td>"+course.building+"</td>";
        result += "<td>"+course.units+"</td>";
        result += "<td>"+course.time+"</td>";
        result += "<td><button class='enroll-button' onclick = 'addToEnrolled(" + JSON.stringify(course) + ")'><i class='fa fa-check'></i></button></td>";
        result += "<td><button class='removesave-button' onclick = 'removeFromSaved(" + JSON.stringify(course) + ")'><i class='fa fa-trash-o'></i></button></td>";
 
        result += "</tr>";
        
            
    });
    result += "</table>";
    savedEl.innerHTML = result;
    
    document.getElementById("savedid").click();
    document.getElementById("savedid").click();
}

function addToEnrolled(course){
    if (enrolled.some((othercourse) => othercourse.name === course.name)) {
        modalEl.innerHTML = "<div class=\"modal\" style =\"animation: fadeout 2s;animation-delay: 1s;animation-fill-mode: forwards;  border: solid 2px rgb(128, 0, 0);background: rgba(239, 202, 203, 0.7);\">Error: Already enrolled in class " + course.name + ".</div>";

    } 
    else if(enrolled.length > 5){

        modalEl.innerHTML = "<div class=\"modal\" style =\"animation: fadeout 2s;animation-delay: 1s;animation-fill-mode: forwards;  border: solid 2px rgb(128, 0, 0);background: rgba(239, 202, 203, 0.7);\">Error: Cannot enroll in class " + course.name + ". Exceeded maximum units.</div>";
    }
    
    else {
        enrolled.push(course);
        removeFromSaved(course);
        renderEnrolled();
        var address = "UCI "+ course.building.substring(0, str.indexOf(' '));; 
        var title = course.building;
        addMarker(address, title, course.name, course.code); 
        addAllClasses(course);
        modalEl.innerHTML = "<div class=\"modal\" style =\"animation: fadeout 2s;animation-delay: 1s;animation-fill-mode: forwards;\">Successfully enrolled in "+ course.name +"</div>";

        
    }

}
function renderEnrolled(){

    if(enrolled.length === 0){
        enrolledEl.innerHTML = "<div id = 'empty'> No enrolled classes.</div>";
        return;
    }
    var result = "<table >";
    enrolled.forEach( (course) => {

        result += "<td>"+course.code+"</td>";
        result += "<td>"+course.title+"</td>";

        result += "<td>"+course.school+"</td>";

        result += "<td>"+course.instructor+"</td>";
        result += "<td>"+course.building+"</td>";
        result += "<td>"+course.units+"</td>";
        result += "<td>"+course.time+"</td>";
        result += "<td><button class='removesave-button' onclick = 'removeFromEnrolled(" + JSON.stringify(course) + ")'><i class='fa fa-trash-o'></i></button></td>";
        result += "</tr>";
    });
    result += "</table>";
    enrolledEl.innerHTML = result;
    
    document.getElementById("enrolledid").click();
    document.getElementById("enrolledid").click();
}

renderCourses();