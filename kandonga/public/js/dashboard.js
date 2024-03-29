/* globals Chart:false, feather:false */

(function () {

  'use strict'

  feather.replace({ 'aria-hidden': 'true' })

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  
  var myChart = new Chart(ctx, {
    
    type: 'line',
    
    data: {

      labels: [

        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'

      ],

      datasets: [{
        
        data: [
          
          15339,
          21345,
          18483,
          24003,
          23489,
          24092,
          12034
        ],
        
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: '#007bff',
        borderWidth: 3,
        pointBackgroundColor: '#fff'
        
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: false
      }
    }
  })
})()
