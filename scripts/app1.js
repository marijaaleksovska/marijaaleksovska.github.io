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

        if(data[i].countryInfo.iso2=="MK"){

            var mkd=data[i];
            console.log(mkd);

            let ct1=document.getElementById("ct-4");
            ct1.innerHTML=mkd.cases;
            
            let ct2=document.getElementById("ct-5");
            ct2.innerHTML=mkd.deaths;

            let ct3=document.getElementById("ct-6");
            ct3.innerHTML=mkd.recovered;

            let ct7=document.getElementById("ct-7");
            ct7.innerHTML="+"+mkd.todayCases;
        }
    }
}).catch(error=>{
    console.log(error);
});

axios.get('https://covid-ca.azurewebsites.net/api/covid/v2/history/',{
    headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
})
.then((response)=>{
    let data =JSON.parse(response.data);
    console.log(data);
    let mkdData;
    for(let i=0;i<data.length;i++){
        if(data[i].country=="Macedonia"){
            mkdData=data[i];
        }
    }
    console.log(mkdData);
    console.log(Object.keys(mkdData.timeline.cases));
    var date=Object.keys(mkdData.timeline.cases);
    var values=Object.values(mkdData.timeline.cases);
    console.log(date);
    console.log(values);
    var ctx = document.getElementById('myChart').getContext('2d');
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: date,
        datasets: [{
            label: 'Вкупно случаи',
            borderColor: 'darkgreen',
            data: values
        }]
    },

    options: {}
});
  

   
}).catch(error=>{
    console.log(error);
});
