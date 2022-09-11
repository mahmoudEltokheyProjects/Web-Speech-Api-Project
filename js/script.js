    // <input></input>
let inputElem = document.querySelector(".inputBox input"),
    // microphone icon container
    microBtn  = document.querySelector(".inputBox .microIconCont"),
    // microphone icon 
    microIcon = document.querySelector(".inputBox .microIconCont i");

// Check if "Browser" support "Speech Api" or not support
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
// if Browser support "SpeechRecognition Api" 
if( SpeechRecognition )
{
    console.log("Supported");
    // Creates a new "SpeechRecognition object"
    let recognition = new SpeechRecognition();
    // console.log(recognition);
    /* +++++++++++++++++++++++++++++++++++ When Click on "Microphone Icon"  +++++++++++++++++++++++++++++++++++ */
    microBtn.addEventListener("click",function(){
        // if <i class="fa fa-microphone"></i> contains class="fa-microphone" then replace "fa-microphone" with "fa-microphone-slash"
        if( microIcon.classList.contains("fa-microphone") )
        {
            // ++++++++++++ Starts the speech recognition service listening to incoming audio  ++++++++++++
            // fa-microphone-slash الي fa-microphone ويحول الايقونة بتاعت الميكرفون من "start event" لما يبدأ التسجيل هيقوم بالنداء علي ال
            recognition.start();
        }
        else
        {
            // ++++++++++++ Stops the speech recognition service from listening to incoming audio ++++++++++++
            // fa-microphone الي fa-microphone-slash ويحول الايقونة بتاعت الميكرفون من "end event" لما ينتهي من التسجيل هيقوم بالنداء علي ال
            recognition.stop();
        }
    });
    /* +++++++++++++++++++++++++++ Check the "start" and "end" of "SpeechRecognition"  +++++++++++++++++++++++++++ */
    // "start event" :  Fired when the speech recognition service has begun listening to incoming audio 
    recognition.addEventListener("start",function(){
         // replace "fa-microphone" with "fa-microphone-slash"
        // fa-microphone-slash الي fa-microphone ويحول الايقونة بتاعت الميكرفون من "start event" لما يبدأ التسجيل هيقوم بالنداء علي ال
         microIcon.classList.replace("fa-microphone","fa-microphone-slash");
        console.log("Start Recognition")
    });
    // "end event" :  Fired when the speech recognition service has disconnected. 
    recognition.addEventListener("end",function(){
        // replace "fa-microphone-slash" with "fa-microphone"
        // fa-microphone الي fa-microphone-slash ويحول الايقونة بتاعت الميكرفون من "end event" لما ينتهي من التسجيل هيقوم بالنداء علي ال
        microIcon.classList.replace("fa-microphone-slash","fa-microphone");
        console.log("End Recognition")
    });
    // "result event" : Fired when the speech recognition service returns a result  
    recognition.addEventListener("result",function(eventVar){
        // return "text speech" 
        var transcriptVar = eventVar.results[0][0].transcript;
        // put "text speech" as "value" to "inputField" 
        inputElem.value = transcriptVar ;
        // search on "transcript" on "Google" after 3second from speech
        setTimeout( 
            function() 
            { 
                searchInGoogle(transcriptVar); 
            } , 3000);

    });
}
// if Browser mot support "SpeechRecognition Api" 
else
{
     console.log("Not Supported");
}

function searchInGoogle(transcriptPara)
{
    window.location.href = `https://www.google.com/search?q=${transcriptPara}`;
}

