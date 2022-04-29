function getLatency() {
  var started = new Date().getTime();
  var url = "/data?t=" + +new Date();
  fetch(url)
    .then(function (response) {
      var ended = new Date().getTime();
      var milliseconds = ended - started;
      document.getElementById("latency").innerHTML = milliseconds + " ms";
    })
    .catch(function (error) {
      document.getElementById("latency").innerHTML = "? ms";
    });
}


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("host").innerHTML = window.location.host;
  getVisitorInfos();
  var timerLatency = window.setInterval(getLatency, 1000);
});
async function getVisitorInfos() {
  if (localStorage.getItem("visitorInfos") == null) {
    var visitorInfos = null;

    await fetch("https://ipinfo.io/json")
      .then(async function (response) {
        visitorInfos = await response.json();
        localStorage.setItem("visitorInfos", JSON.stringify(visitorInfos));
      })
      .catch(function (error) {
        console.log(error);
      });
  } else {
    visitorInfos = JSON.parse(localStorage.getItem("visitorInfos"));
  }

  //console.log(visitorInfos);
  document.getElementById("yourIP").innerHTML = visitorInfos.ip
    ? visitorInfos.ip
    : "?";
  document.getElementById("location").innerHTML = visitorInfos.country
    ? visitorInfos.country + ", " + visitorInfos.city
    : "?";
}

//set the host
