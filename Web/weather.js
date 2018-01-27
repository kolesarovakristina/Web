
$(document).ready(function() {
   $('#btnOk').click(function() {
       var city=$("#city").val();
       var code=$("#code").val();
       
       if(city.length>1){
          var urllink='http://api.openweathermap.org/data/2.5/weather?q=';
           urllink=urllink + city;
           if(code.length==2)
               urllink=urllink+','+code;
           urllink=urllink+'&appid=86c5542317996d1c59638a917b09c0b8'
           
           $.ajax({
                url: urllink,
                data : { format: 'json' },  
            error : function(){
             //vypis chyby 
                $('.mainTable').html("Error! Invalid request!");
           },
            dataType: 'json',
            success : function(data){
                
                //dynamic table
      $(".mainTable").empty();
    var table = $('<table/>')
    table.addClass('table  table-bordered table-hover ');
    $(".mainTable").append(table);

    

    table.append("<th class='col-md-12 headRow text-center'colspan ='2'>Weather in "+data.name+"</th>");
    table.append(getRow('Temperature: ',parseFloat(data.main.temp-273.15).toFixed(1) + '°','Humidity: ',data.main.humidity+'%' ));
    table.append(getRow('Desc: ', data.weather[0].description,'Pressure: ',data.main.pressure + ' hPa' ));

    if($('#details').is(":checked")==true){

        table.append(getRow('Wind speed: ', data.wind.speed + 'm/s','Visibility:', parseFloat(data.visibility/1000).toFixed(2)+" km" ));
        table.append(getRow('Min temperature: ', parseFloat(data.main.temp_min-273.15).toFixed(1)+ '°','Max temperature: ',parseFloat(data.main.temp_max-273.15).toFixed(1)+ '°' ));
        var sunrise=data.sys.sunrise;
                    var sunriseTime=new Date(1000*sunrise);
                    hR = sunriseTime.getHours();
                    mR = sunriseTime.getMinutes(); 
                         
                    
        var sunset=data.sys.sunset;
                    var sunsetTime=new Date(1000*sunset);
                    hS = sunsetTime.getHours(); 
                    mS = sunsetTime.getMinutes(); 
            table.append(getRow('Sunrise:', hR+":"+mR, 'Sunset:', hS+":"+mS));         
                   

      var mapsUrl = "<a href =\"http://www.google.com/maps/search/?api=1&query="+data.coord.lat+','+ data.coord.lon+"\" target=\"_blank\">Google maps</a>";
      console.log(mapsUrl);
      table.append(getRow(mapsUrl,'','',''));           
    };
                
            },
            type: 'GET'
           }); //AJAX
           
       } //if city.length 
       
   }); // CLICK

function getRow(name1,data1,name2,data2){
    var row = $('<tr id="tr"/>');
    var column = $('<td class="td1"/>');
    var column2 = $('<td class="td2"/>');
    row.append(column);
    column.html(name1 + data1);
    row.append(column2);
    column2.html(name2 + data2);
    return row;
    
 };
    
}); // READY
