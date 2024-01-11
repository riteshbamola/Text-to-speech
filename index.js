// clock 


function updateClock() {
    var now = new Date();

    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    var timeString = hours + ':' + minutes + ':' + seconds;

    
    document.getElementById('clock').innerText = timeString;

 
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var dateString = now.toLocaleDateString(undefined, options);
    document.getElementById('date').innerText = dateString;

  
    setTimeout(updateClock, 1000);
}

updateClock();





//Get started button

let btn= document.querySelector(".btn");
btn.addEventListener("click",()=>{
    var convertorSection = document.querySelector('.convertor');
    convertorSection.scrollIntoView({ behavior: 'smooth' });

})


//Voice recognition

let listento=document.querySelector(".listento");
let textarea= document.querySelector(".textarea");

listento.addEventListener("click",()=>{
    let recognition= new webkitSpeechRecognition();
    recognition.lang="en-GB";
    recognition.onresult=(event)=>{
        console.log(event);
        textarea.value=event.results[0][0].transcript;
    }
    recognition.start();
});


//Speech Synthesis



let speech= new SpeechSynthesisUtterance();


let voices= [];
let listening =document.querySelector(".listening");
let convert=document.querySelector(".convert");
let voiceselect=document.querySelector("select");

window.speechSynthesis.onvoiceschanged = () =>
{
    voices=window.speechSynthesis.getVoices();
    speech.voice=voices[0];
    voices.forEach((voice,i) => (voiceselect.options[i])= new Option(voice.name ,i));
}
voiceselect.addEventListener("change" ,() =>{
    speech.voice= voices[voiceselect.value];
})
document.querySelector(".convert").addEventListener("click" ,() =>{
    speech.text=document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
    listening.innerHTML ="Speaking...";
    setTimeout(function () {
        listening.innerHTML ="Speak...Listen...";
    }, 3000);


    

})

listento.addEventListener("click" ,()=>{
    listening.innerHTML ="Listening...";
    setTimeout(function () {
        listening.innerHTML ="Speak...";
    }, 3000);
})