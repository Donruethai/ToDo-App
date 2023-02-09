function updateClock() {
  let now = new Date();
  let date = now.toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  let time = now.toLocaleTimeString();
  document.getElementById("date").innerHTML = ` ${date}`;
  document.getElementById("time").innerHTML = time;
}

updateClock();
setInterval(updateClock, 1000);



