const btn = document.querySelector('.talk');
const content = document.querySelector('#contentArea');
const reply = document.querySelector('#replyArea');
var volume = 1;
var rate = 1;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();


const greetings = ["I'm good, you little shit", "Fuck you very very very much", "You're a bit thick"];
const weather = ["Brah", "Get your life together", "It's always sunny in hell"];
const unspecified = ["Yeah. Couldn't care less, my dumbass developer didn't program me to reply to that, so I don't give a goddamn, okay? Leave me the fuck alone.", "I CAN NOT HEAR YOU", "What the hell are you saying?", "I'm a simple little program. Almost as simple as you are. That's beyond me, I'm afraid."]

recognition.onstart = function() {
	console.log('Voice is activated. Talk to the microphone.');

};



recognition.onresult = function(event) {
	const current = event.resultIndex;

	const transcript = event.results[current][0].transcript;
	content.textContent = transcript;
	readOutLoud(transcript);

	console.log("Read out loud function initiated.");
};

//add listener to button

btn.addEventListener('click', () => {
	recognition.start();
	reply.textContent = "";
	content.textContent = "";
});



function readOutLoud(message) {
	const speech = new SpeechSynthesisUtterance();
	const finalText = unspecified[Math.floor(Math.random() * unspecified.length)];
	speech.text = finalText;
	speech.volume = volume;
	
	speech.pitch = 1;
	speech.volume = volume;
	if(message.includes('how')){
		const finalText = greetings[Math.floor(Math.random() * greetings.length)];
		
		speech.text = finalText;
		reply.textContent = finalText;
		console.log(finalText);
	}
	else if(message.includes('weather')){
		const finalText = weather[Math.floor(Math.random() * weather.length)];
		reply.textContent = finalText;
		speech.text = finalText;
		console.log(finalText);
	}

	else if(message.includes('song')){
		reply.textContent = "Playing that song";
		speech.text = "Playing that song";
		var audio = new Audio('song.mp3')
		audio.play();
	}

	else if(message.includes('stop')){
		speech.text = "No fucking way, dumb arse.";
		reply.textContent = "Never gonna stop the music!";
	}

	else if(message.includes('help')){
		alert("You can try asking me about the weather, how I'm going, or to play a song.");
		speech.text = "You primitive. Eh, I'll help."
		reply.textContent = "You primitive. Well, at least now you know something.";
	}

	else if(message.includes('time')){
		var dateTime = new Date();
		speech.text = dateTime + ". If I can work that out then why the fuck can't you?";
		reply.textContent = dateTime + ". If I can work that out then why the fuck can't you?";
	}
	else if(message.includes('calm')){
		rate--;
		speech.rate = rate;
		speech.text = "Okay, grandma, I'm calm.";
		reply.textContent = "Okay grandma. I'm calm."
	}

	else if(message.includes('hurry up')){
		rate++;
		rate++;
		speech.rate=rate;
		speech.text = "Gotcha kiddo. This good?";
		reply.textContent = "Gotcha kiddo. This good?";
	}
	else{
		reply.textContent = finalText;
		speech.rate=rate;
		
	}
	

	

	
	
	window.speechSynthesis.speak(speech);
	console.log("Should be speaking now. Speaking function completed.");

}