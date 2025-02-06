let miCanvas = document.getElementById("miGrafica").getContext("2d");

var chart = new Chart(miCanvas, {
    type: 'line',
    data:{
        labels:['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets:[
            {
                label: "Nuestros rendimientos en el año",
                backgroundColor: "rgb(232, 157, 116)",
                borderColor: "rgb(0,0,0)",
                data: [100000, 900000, 850000, 2300000, 950000, 4800000]
            }
        ]
    }
})

