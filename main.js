var cards = document.querySelectorAll('.card');

[...cards].forEach((card)=>{
  card.addEventListener( 'click', function() {
    card.classList.toggle('is-flipped');
  });
});






/* Set the width of the sidebar to 250px (show it) */
function openNav() {
    document.getElementById("mySidepanel").style.bottom = "5px";
    document.getElementById("mySidepanel").style.right = "5px";
    document.getElementById("mySidepanel").style.width = "275px";
    document.getElementById("mySidepanel").style.boxShadow = "0px 0px 60px 2px rgba(0, 0, 0, 0.65)";

    

  }
  
  /* Set the width of the sidebar to 0 (hide it) */
  function closeNav() {
    document.getElementById("mySidepanel").style.width = "0";
    document.getElementById("mySidepanel").style.boxShadow = "none";

  }






  function chatBot() {

    this.input;
    
    this.respondTo = function (input) {
  
      this.input = input.toLowerCase();
        
      var num = Math.floor(Math.random() * 6);

      if (this.match('(hi|hello)'))
      return "Hi buddy.";
  
      if (this.match('(how are you)'))
         return "I'm splendid. And you?";
      
      if(this.match('(ok|okay)'))
        return "Ok."

      if(this.match("(advising)"))
        return "academicadvising.uci.edu"
      if(this.match('(lol|lmao)'))
      return "I'm funny huh.";

      if (num == 0){
        return "Why don't anteaters ever get sick? They're full of anty bodies.";
      }
      if(num == 1){
        return "ZOT! ZOT! ZOT!";
      }
      if(num == 2){
        return "I think Peter is the best mascot. Do you agree?";
      }
      if(num == 3){
        return "I <3 UCI."
      }
      if(num == 4){
        return "Do you happen to have any ants?";
      }
      if(num == 5){
        return "I'm going to be honest with you right now. I am not real.";
      }
      
    };
  
    
    this.match = function (regex) {
  
      return new RegExp(regex).test(this.input);
    };
  }
  
  
  $(function () {
  
   
    var you = 'You';
    var robot = 'Peter';
  
   
    var delayStart = 400;
    var delayEnd = 800;
  
    
    var bot = new chatBot();
    var chat = $('.chat');
    var waiting = 0;
    $('.busy').text(robot + ' is typing...');
  
   
    var submitChat = function () {
  
      var input = $('.input input').val();
      if (input == '') return;
  
      $('.input input').val('');
      updateChat(you, input);
  
      var reply = bot.respondTo(input);
      if (reply == null) return;
  
      var latency = Math.floor(Math.random() * (delayEnd - delayStart) + delayStart);
      $('.busy').css('display', 'block');
      waiting++;
      setTimeout(function () {
        if (typeof reply === 'string') {
          updateChat(robot, reply);
        } else {
          for (var r in reply) {
            updateChat(robot, reply[r]);
          }
        }
        if (--waiting == 0) $('.busy').css('display', 'none');
      }, latency);
    };
  
    var updateChat = function (party, text) {
  
      var style = 'you';

      
      if (party != you) {
    
        style = 'other';
      }

      

      var line = $('<div><span class="party">');
      line.find('.party').addClass(style).text( text);
    //   line.find('.text').text(text);
      chat.append(line);

      var line2 = $('<div><span class="party">');
      line2.find('.party').addClass('after');
      chat.append(line2);
  
      chat.stop().animate({ scrollTop: chat.prop("scrollHeight") });
  
    };
  
  
    $('.input').bind('keydown', function (e) {
      if (e.keyCode == 13) {
        submitChat();
      }
    });
    $('.input a').bind('click', submitChat);
  
  
    updateChat(robot, "Hello! I'm Peter and can help answer your questions about registration.");
    updateChat(robot, "What do you need help with?");
  
  });