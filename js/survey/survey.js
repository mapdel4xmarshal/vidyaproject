(function(){    
    //window.onload = function()
    //{        
        var question = 0;

        $("#start_survey").click(function(){

            $("#start").removeClass("show");
            $("#start").addClass("hide");

            doNext();
        });

        $("#next").click(function(){ 
            if($(this).hasClass("disabled"))
            {
                $("#error").html('<div class="alert alert-danger">' +
                                 '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>'+
                                 '<span class="floatLeft"><strong>App Error!'+
                                 '</strong> Please place pin on map</span></div>');    
            }
            else
            if(doValidate("answer_"+question,question)) doNext();
        });

        $("#prev").click(function(){        
            doPrev();
        });

        $("#complete").click(function(){        
            //$().addClass("hide");
            $("#survey").html('<div id="survey" class="alert alert-success"><span class="floatLeft"><strong>Completed!'+
                     '</strong> Thank you for responding to the survey.</span> <button class="btn btn-danger floatRight padbtm">sign out</button></div>');
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

    //}


    function doValidate(name,i)
    {
        if($('#'+name).length != 0){
            var x = $('#'+name).val();
            if (x == null || x == "" || x.length <= 2) {
                alert("Please input a valid answer for question " + i);
                return false;
            }
            doPin();
        }


        return true;
    }
})();