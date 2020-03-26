axios.get('https://covid-ca.azurewebsites.net/api/covid/countries',{
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then((response)=>{
    let data =JSON.parse(response.data);
    console.log(data);
    let tb=document.getElementById("tbody");
  
    for(let i=0;i<data.length;i++){
        let tr=document.createElement("tr");
        let td1=document.createElement("td");
        td1.innerHTML=data[i].country;
        td1.style.fontWeight="bold";
        tr.appendChild(td1);

        let td2=document.createElement("td");
        td2.innerHTML=data[i].cases;
        tr.appendChild(td2);

        let td3=document.createElement("td");
        td3.innerHTML="+"+data[i].todayCases;
        tr.appendChild(td3);

        let td4=document.createElement("td");
        td4.innerHTML=data[i].deaths;
        tr.appendChild(td4);

        let td5=document.createElement("td");
        td5.innerHTML="+"+data[i].todayDeaths;
        tr.appendChild(td5);

        let td6=document.createElement("td");
        td6.innerHTML=data[i].recovered;
        tr.appendChild(td6);

        let td8=document.createElement("td");
        td8.innerHTML=data[i].critical;
        tr.appendChild(td8);
        
        tb.appendChild(tr);


  
    }
    
}).catch(error=>{
    console.log(error)
});

axios.get('https://covid-ca.azurewebsites.net/api/covid/overview',{
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then((response)=>{
    let data =JSON.parse(response.data);
    console.log(data);
    let ct1=document.getElementById("ct-1");
    ct1.innerHTML=data.cases;
    let ct2=document.getElementById("ct-2");
    ct2.innerHTML=data.deaths;
    let ct3=document.getElementById("ct-3");
    ct3.innerHTML=data.recovered;
}).catch(error=>{
    console.log(error)
});

axios.get('https://covid-ca.azurewebsites.net/api/covid/countries',{
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then((response)=>{
    let data =JSON.parse(response.data);
    console.log(data);
    google.charts.load('current', {
        'packages':['geochart'],'mapsApiKey': 'AIzaSyCZ6arsk9pY6-cweBJ8VkjAoDsbC-0Qqvg'
      });
      google.charts.setOnLoadCallback(drawRegionsMap);
     function drawRegionsMap(){
        var data1 = new google.visualization.DataTable();
        data1.addColumn('string', 'Земја');
        data1.addColumn('number', 'Вкупно случаи');
       
        for(let i=0;i<data.length;i++){
            if(data[i].country=="USA"){
                data1.addRow(['United States',data[i].cases]);
            }
            if(data[i].country=="Czechia"){
                data1.addRow(['Czech Republic',data[i].cases]);
            }
            if(data[i].country=="Macedonia, the former Yugoslav Republic of"){
                data1.addRow(['Macedonia',data[i].cases]);
            }
            data1.addRow([data[i].country,data[i].cases])
        }
        var options = {
           
            colorAxis: {colors: ['#C5E8B7','#57C84D','#2EB62C','#00853f','yellow', 'orange', '#e31b23']},
        
            datalessRegionColor: '#C5E8B7',
            defaultColor: '#C5E8B7',
            explorer: {},
            navigation: {
                initialLat: 35.04409,
                initialLng: -90.246213,
                initialZoom: 4,
                minZoom: 4
            }
          };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data1, options);
    $(window).resize(function(){
        drawRegionsMap();
      });
     }
    
    
    
}).catch(error=>{
    console.log(error)
});
