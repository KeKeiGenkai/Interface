function drawMostYearChart(data) {
  var labels = Object.keys(data.mostyear);
  var values = Object.values(data.mostyear);

  var ctx = document.getElementById('mostYearChart').getContext('2d');
  var mostYearChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Most Year',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function drawTextUsersChart(data) {
  var labels = Object.keys(data.textusers);
  var values = Object.values(data.textusers);

  var ctx = document.getElementById('textUsersChart').getContext('2d');
  var textUsersChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Text Users',
              data: values,
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function drawAverageCharsPerMessageChart(data) {
  var labels = data.averageCharsPerMessage.map(obj => obj.fromUser);
  var values = data.averageCharsPerMessage.map(obj => obj.averageCharsPerMessage);

  var ctx = document.getElementById('averageCharsPerMessageChart').getContext('2d');
  var averageCharsPerMessageChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Average Chars Per Message',
              data: values,
              backgroundColor: 'rgba(255, 206, 86, 0.2)',
              borderColor: 'rgba(255, 206, 86, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function drawMessagesWithTextCountsChart(data) {
  var labels = data.messagesWithTextCounts.map(obj => obj.fromUser);
  var voiceMessages = data.messagesWithTextCounts.map(obj => obj.voice_message);
  var videoMessages = data.messagesWithTextCounts.map(obj => obj.video_message);
  var stickers = data.messagesWithTextCounts.map(obj => obj.sticker);

  var ctx = document.getElementById('messagesWithTextCountsChart').getContext('2d');
  var messagesWithTextCountsChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Voice Messages',
              data: voiceMessages,
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
              borderColor: 'rgba(54, 162, 235, 1)',
              borderWidth: 1
          }, {
              label: 'Video Messages',
              data: videoMessages,
              backgroundColor: 'rgba(255, 159, 64, 0.2)',
              borderColor: 'rgba(255, 159, 64, 1)',
              borderWidth: 1
          }, {
              label: 'Stickers',
              data: stickers,
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
              borderColor: 'rgba(153, 102, 255, 1)',
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
}

function sendRequest(action) {
  var xhr = new XMLHttpRequest();
  var url = 'http://localhost:8080/' + action;

  xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status == 200) {
              var responseData = JSON.parse(xhr.responseText);
              drawMostYearChart(responseData);
              drawTextUsersChart(responseData);
              drawAverageCharsPerMessageChart(responseData);
              drawMessagesWithTextCountsChart(responseData);
          } else {
              document.getElementById("response").innerHTML = "Ошибка: " + xhr.status;
          }
      }
  };

  xhr.open("POST", url, true);
  xhr.send();
}
