const Calendar = tui.Calendar;


const calendar = new Calendar('#calendar', {
    defaultView: 'week',
    isReadOnly: true,
    useDetailPopup: true,
    dayNames: ["Mon", "Tues", "Wed", "Thurs", "Fri"], 
    calendars: [
      {
        id: 'cal1',
        name: 'Personal',
        backgroundColor: '#03bd9e',
      }
    ],

  });

  calendar.setOptions({
    week: {
      workweek: true,
      taskView: false,
      eventView: ['time'],
      hourStart: 7,
      hourEnd: 21,
      showNowIndicator: false,
    },
  });

function makeTestEvent(){
  calendar.createEvents([
    {
      id: 'event1',
      calendarId: 'cal1',
      title: 'Weekly Meeting',
      start: new Date(2023, 1, 24, 9, 50),
      end: new Date(2023, 1, 24, 10, 50),
    },
  ]);
}

calendar.render();

function getTimes(time, code, building, name, instructor,  colored){
    var i = time.indexOf(' ')
    const days = time.substring(0,i);
    const classTime = time.substring(i+1);
    var o = classTime.indexOf('-');
    const start = classTime.substring(0,o);
    const startHour = start.split(':')[0];
    const startMin = start.split(':')[1];
    var end = classTime.substring(o+1);
    end = end.trim();
    const endHour = end.split(':')[0];
    var endMin = end.split(':')[1];
    var startHourF = 0;
    var endHourF = 0;
    if (classTime.includes('p')){
        if(startHour == 11 || startHour == 12){
            startHourF = startHour;
        }
        if(endHour == 12){
            endHourF = endHour;
        }
        if(startHour!= 11 && startHour!= 12 && endHour != 12){
        startHourF = parseInt(startHour) +12;
        endHourF = parseInt(endHour) + 12;
        }
        if(endHourF == 0){
            endHourF = parseInt(endHour) + 12;
        }
        endMin = endMin.substring(0,2);
    }
    else {
        startHourF = startHour;
        endHourF = endHour;
    }
    // month in date object is index 0 based so Jan = 0, feb = 1
    if (days.includes('M')) {
        const startDate = new Date(2023, 1, 20, startHourF, startMin);
        const endDate = new Date(2023, 1, 20, endHourF, endMin);
        calendar.createEvents([{id: String(code), calendarId: "cal1", title: name, start: startDate, end: endDate, location: building, body: instructor, backgroundColor: colored, }]);    
        } 
    if(days.includes('Tu')) {
        //  block of code to be executed if the condition is false
        const startDate = new Date(2023, 1, 21, startHourF, startMin);
        const endDate = new Date(2023, 1, 21, endHourF, endMin);
        calendar.createEvents([{id: String(code), calendarId: "cal1", title: name, start: startDate, end: endDate, location: building, body: instructor,backgroundColor: colored,}]);    
    }
    if(days.includes('W')) {
        //  block of code to be executed if the condition is false
        const startDate = new Date(2023, 1, 22, startHourF, startMin);
        const endDate = new Date(2023, 1, 22, endHourF, endMin);
        calendar.createEvents([{id: String(code), calendarId: "cal1", title: name, start: startDate, end: endDate, location: building,body: instructor, backgroundColor: colored,}]);    
    }
    if(days.includes('Th')) {
        //  block of code to be executed if the condition is false
        const startDate = new Date(2023, 1, 23, startHourF, startMin);
        const endDate = new Date(2023, 1, 23, endHourF, endMin);
        calendar.createEvents([{id: String(code), calendarId: "cal1", title: name, start: startDate, end: endDate, location: building, body: instructor, backgroundColor: colored,}]);    
    }
    if(days.includes('F')) {
        //  block of code to be executed if the condition is false
        const startDate = new Date(2023, 1, 24, startHourF, startMin);
        const endDate = new Date(2023, 1, 24, endHourF, endMin);
        calendar.createEvents([{id: String(code), calendarId: "cal1", title: name, start: startDate, end: endDate, location: building, body: instructor,backgroundColor: colored,}]);    
        }
        calendar.render();
    }

function addAllClasses(course){
    
    getTimes(course.time, course.code, course.building, course.name, course.instructor,  randomColor());
    calendar.render();
}

function randomColor(){
    const colors = ["#BEDAE3",
        "#C4E9DA",
        "#FED5CF",
        "#F1B598",
        "#D3C7E6",]
    var randomizedCol = colors[Math.floor(Math.random()*5)];
    return randomizedCol;
}
function deleteClass(code){
    calendar.deleteEvent(code, "cal1");
    calendar.deleteEvent(code, "cal1");
    calendar.deleteEvent(code, "cal1");
    calendar.deleteEvent(code, "cal1");
    calendar.deleteEvent(code, "cal1");
    calendar.render();
}