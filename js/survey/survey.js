//(function(){   
        var question = 0;
        
    $(window).click(function(e){
        if($(e.target).attr('id') == "error_dismiss")
            $("#error").css("z-index", '-9999');
    });
        $("#start_survey").click(function(){
                doLogin();//LoadQuestions();
                $("#start").removeClass("show");
                $("#start").addClass("hide");  
        });

        $("#next").click(function(){ 
            if($(this).hasClass("disabled"))
            {
                $("#error").html('<div class="alert alert-danger">' +
                                 '<a href="#" id="error_dismiss" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                                 '<span class=""><strong>App Error!'+
                                 '</strong> Please place pin on map</span></div>');
                $("#error").css("z-index", '9999');
            }
            else
            if(doValidate("answer_"+question,question)) doNext();
        });

        $("#prev").click(function(){        
            doPrev();
        });
    
        $("#survey").click(function(e){
            var targetID = $(e.target).attr('id');
            if(targetID.indexOf("pin_") != -1)
                {
                    var questin = targetID.substring(targetID.indexOf("_")+1,targetID.length);
                    if(doValidate("answer_"+questin,questin)){                    
                    if($("#answer_"+questin).prop('value').length > 0)
                    var mark = placePin($("#answer_"+questin).prop('value'),"#answer_"+questin);}
                }
        });

        $("#complete").click(function(){        
            if($(this).hasClass("disabled"))
            {
                $("#error").html('<div class="alert alert-danger">' +
                                 '<a href="#" id="error_dismiss" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                                 '<span class=""><strong>App Error!'+
                                 '</strong> Please answer the question and place pin on map</span></div>');
                $("#error").css("z-index", '9999');
            }
            else
            {
            	doSubmit();                
            }
        });

        function doNext()
        {
            var curQuestion = "#question_"+question;
            var nextQuestion = "#question_"+(question+1);

            if($(nextQuestion).length != 0)
            {
                $(curQuestion).addClass("hide");
                $(curQuestion).removeClass("show");

                $(nextQuestion).addClass("show");
                $(nextQuestion).removeClass("hide");           

                question++;

                if($("#question_"+(question+1)).length != 0)
                {
                    $("#next").addClass("show disabled");
                    $("#next").removeClass("hide");
                }
                else
                {
                    $("#next").addClass("hide");
                    $("#next").removeClass("show");

                    $("#complete").addClass("show");
                    $("#complete").removeClass("hide");
                }
            }
            else
            {
            }


            if(question == 1)
                {
                    $("#prev").addClass("show disabled");
                    $("#prev").removeClass("hide");
                }
            else{
                    $("#prev").removeClass("disabled");
                }

        }


        function doPrev()
        {
            var curQuestion = "#question_"+question;
            var prevQuestion = "#question_"+(question-1);

            if($(prevQuestion).length != 0)
            {
                $(curQuestion).addClass("hide");
                $(curQuestion).removeClass("show");

                $(prevQuestion).addClass("show");
                $(prevQuestion).removeClass("hide");

                $("#next").addClass("show");
                $("#next").removeClass("hide");
                $("#complete").removeClass("show");
                $("#complete").addClass("hide");

                question--;

                if($("#question_"+(question-1)).length != 0)
                {
                    $("#next").addClass("show");
                    $("#next").removeClass("hide");
                }
                else
                {
                    $("#prev").addClass("disabled");
                }
            }
            else
            {

            }        
        }


    function doValidate(name,i)
    {
        if($('#'+name).length != 0){
            var x = $('#'+name).prop('value');
            if (x == null || x == "" || x.length <= 2) {
                $("#error").html('<div class="alert alert-danger">' +
                                 '<a href="#" class="close" id="error_dismiss" data-dismiss="alert" aria-label="close">&times;</a>'+
                                 '<span class=""><strong>Input Error!'+
                                 '</strong> Please input a valid answer for question ' + i + '</span></div>'); 
                $("#error").css("z-index", '9999');
                return false;
            }            
        }
        return true;
    }
    
    
    
//})();

function doLoadQuestions()
{
    $.ajax({  
      type: "POST",  
      url: "http://bmtool.us/vidyaproject/php/dbscript.php",
      data: {getQuestion: 'getQuestion'},
      success: function(msg){
          var result = JSON.parse(msg);
          var concat_result = "";
          for(i = 0; i < result.length; i++)
            {
              concat_result += 
                  '<div id="question_'+ (i+1) +'"  class="hide">'+
                    '<label class="control-label" for="answer_'+(i+1)+'">'+
                        '<small>Question '+(i+1)+' :</small>'+
                    '</label>'+
                    '<small>' + result[i][1] + '</small>'+
                    '<div class="input-group">'+
                        '<input type="text" name="answer_'+(i+1)+'" id="answer_'+ (i+1) + '" value="" required'+ 'placeholder="e.g Hanover park" class="form-control col-md-9 col-lg-12">'+
                        '<span class="input-group-btn">'+
                              '<button type="button" id= "pin_'+(i+1)+'" class="btn btn-default"><span id= "pin_'+(i+1)+'" class="glyphicon glyphicon-map-marker"></span></button>'+
                        '</span>'+
                    '</div> '+
                  '</div>';
            }
          $('#questions').html(concat_result);              
          doNext();
      }  
    });
}


function doSubmit()
{console.log(markersArray);
    $.ajax({  
      type: "POST",  
      url: "http://bmtool.us/vidyaproject/php/dbscript.php",
      data: {createUser: facebookID,
      	firstname: firstname,
      	lastname: lastname,
      	email: '',
      	answer1: $('#answer_1').prop('value'),
      	answer2: $('#answer_2').prop('value'),
      	coord1: markersArray[0].getPosition().lat() +','+markersArray[0].getPosition().lng(),
      	coord2: markersArray[1].getPosition().lat() +','+markersArray[1].getPosition().lng()
      },
      success: function(msg){
	$("#survey").html('<div id="" class="alert alert-success floatCenter"><span class=""><strong>Completed!'+
                 '</strong> Thank you for responding to the survey.  </span> <button class="btn btn-danger padbtm" onclick="doLogout()">sign out</button></div>');
      },
      error: function(request,status,errorThrown){
      	$("#error").html('<div class="alert alert-danger">' +
                                 '<a href="#" id="error_dismiss" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                                 '<span class=""><strong>Server Error!'+
                                 '</strong> Error occured while saving your survey!</span></div>');
                    $("#error").css("z-index", '9999');
      } 
    });
}