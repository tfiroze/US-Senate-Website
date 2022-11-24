function load_JSON(){
    var xmlhttp = new XMLHttpRequest();
    var url = "senators.json";

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            
            //Parse the JSON data to a JavaScript variable. 
            var parsedObj = JSON.parse(xmlhttp.responseText);    
            // This function is defined below and deals with the JSON data parsed from the file. 
            displayJSON(parsedObj); 
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};


    
function displayJSON(obj) {
    
    var sen = obj.objects;
    
    // This code iterates through the colorArray and writes html code to put the color information in a table.
    var rep = 0;
    var dem = 0;   
    for (var i=0; i <sen.length; i++) 
    {    
        var part = sen[i].party; 
        if(part == 'Republican')    
        {
            rep +=1;
        }
        else if(part == 'Democrat')    
        {
            dem +=1;
        }
        
    }
     // Close the table element.
    
    
    // Add the new html code to the div element with id = 'id01'.
    document.getElementById("id01").innerHTML = rep;
    document.getElementById("id02").innerHTML = dem;
    
}