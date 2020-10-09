			window.SetVolume = function(val)
			{
			    var player = document.getElementById('audio');
			    console.log('Before: ' + player.volume);
			    player.volume = val / 100;
			    console.log('After: ' + player.volume);
			}
			// Volba kvality
			var checkBox = document.getElementById("kvalita");

			const radioSource = "https://icecast9.play.cz/radio-ostravan-256.mp3" + "?" + Math.floor((Math.random() * 10000) + 1) ;
			const resetAudio = "about:blank";
			const loader = document.getElementById('loader');
			const audio = document.getElementById('audio');
			audio.addEventListener('loadstart', () => {
			  if (audio.src !== resetAudio) {
			    loader.style.visibility = "visible";
			  }
			});
			audio.addEventListener('playing', () => {
			  loader.style.visibility = "hidden";
			});
			document.getElementById('kolemtlacitka').addEventListener('click', (evt) => {
			  var element = document.getElementById("on");
			  if(audio.paused){
			    audio.src = resetAudio;
			    audio.pause();
					audio.src = radioSource;
			    audio.load();
			    audio.play();
					element.classList.remove("fa-play");
			    element.classList.add("fa-pause");
					checkBox.checked = true;
			  } else {
			    element.classList.remove("fa-pause");
			    element.classList.add("fa-play");
			    audio.src = resetAudio;
			    audio.pause();
			  }
			 })

			function check(){
			  if (checkBox.checked == true){
			    const radioSource = "https://icecast9.play.cz/radio-ostravan-256.mp3" + "?" + Math.floor((Math.random() * 10000) + 1) ;
			    const resetAudio = "about:blank";
					var element = document.getElementById("on");
			    audio.src = resetAudio;
			    audio.pause();
					audio.src = radioSource;
			    audio.load();
					audio.play();
					element.classList.remove("fa-play");
				 element.classList.add("fa-pause");

			 } else {
			   const radioSource = "https://icecast9.play.cz/radio-ostravan.mp3" + "?" + Math.floor((Math.random() * 10000) + 1) ;
			   const resetAudio = "about:blank";
				 var element = document.getElementById("on");
				 audio.src = resetAudio;
				 audio.pause();
				 audio.src = radioSource;
				 audio.load();
				 audio.play();
				 element.classList.remove("fa-play");
				 element.classList.add("fa-pause");
			}

			}
			   function CoHraje() {
			   var url = "https://onair.play.cz/json/radio-ostravan.json";
			   var xmlHttp = new XMLHttpRequest();
			   xmlHttp.onreadystatechange = function() {
			   if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
			   document.getElementById('song').innerHTML = JSON.parse(xmlHttp.responseText).song;
			   document.getElementById('umelec').innerHTML = JSON.parse(xmlHttp.responseText).artist;
			   window.document.title = JSON.parse(xmlHttp.responseText).artist + " - " + JSON.parse(xmlHttp.responseText).song + " | Rádio Ostravan";
			   	}
			   }
			   xmlHttp.open("GET", url, true);
			   xmlHttp.send();
			   }
			   CoHraje();
			   setInterval(CoHraje, 1500); // 2s


			// reload bloků
			window.setInterval("reloadIFrame();", 60000);
			function reloadIFrame() {
			 document.getElementById("iframe_reload").src="https://www.radioostravan.cz/list";
			}

			document.getElementById('on').addEventListener('click', (evt) => {
			  var element = document.getElementById("on");
			  element.classList.remove("fa-pause");
			  element.classList.add("fa-play");
			})

