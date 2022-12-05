var sen =0;
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
    
     sen = obj.objects;
    
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
    var repout = "Republicans: " + rep;
    var demout = "Democrats: " + dem;
    var name;
    var leadInfo = "<table border = 2 >";
    leadInfo += "<tr><th>Title</th><th>Name</th><th>Party</th></tr>"; 
    for (var i=0; i <sen.length; i++) 
    {    
         
        var lead = sen[i].leadership_title; 
        
        if(lead != null)    
        {
            var par = sen[i].party;
            if(par=="Democrat")
            {
                name=sen[i].person.firstname + " "+sen[i].person.middlename + " "+sen[i].person.lastname ;            
                leadInfo += "<tr><td>" + lead + "</td><td>" +  name+ "</td><td>" + par + "</td></tr>";
            }
        }
        
    }
    for (var i=0; i <sen.length; i++) 
    {    
         
        var lead = sen[i].leadership_title; 
        
        if(lead != null)    
        {
            var par = sen[i].party;
            if(par=="Republican")
            {
                name=sen[i].person.firstname + " "+sen[i].person.middlename + " "+sen[i].person.lastname ;            
                leadInfo += "<tr><td>" + lead + "</td><td>" +  name+ "</td><td>" + par + "</td></tr>";
            }
        }
        
    }
    leadInfo += "</table>";
    seninfo = "<table border = 2 >";
    seninfo += "<tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th><th>but</th></tr>";
    for (var i=0; i <sen.length; i++) 
    { 
        var name=sen[i].person.firstname + " "+sen[i].person.middlename + " "+sen[i].person.lastname ;
        var par = sen[i].party;
        var state = sen[i].state;
        var gend = sen[i].person.gender; 
        var rank = sen[i].senator_rank_label; 
        
        seninfo += "<tr><td><a href=\"index2.html\">"+ name + "</a></td><td>" + par + "</td><td>" + state + "</td><td>"+gend +"</td><td>"+rank+"</td><td>"+ "<button onClick=\"page("+sen[i].person.cspanid+")\">Click me</button></td></tr>";
    }
    seninfo += "</table>";
     // Close the table element.
     
    

    
    
    // Add the new html code to the div element with id = 'id01'.
    document.getElementById("id01").innerHTML = repout;
    document.getElementById("id02").innerHTML = demout;
    document.getElementById("id03").innerHTML = leadInfo;
    document.getElementById("id04").innerHTML = seninfo;
    document.getElementById("id05").innerHTML = repout;
    
    
}
var op
function page(num)
    {
        window.location.href = "test.html";
        seninfo = "<table border = 2 >";
        seninfo += "<tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th><th>but</th></tr>";
        for (var i=0; i <sen.length; i++) 
        {
            if(num==sen[i].person.cspanid)
            {
                var name=sen[i].person.firstname + " "+sen[i].person.middlename + " "+sen[i].person.lastname ;
                var office = sen[i].office;
                var dob = sen[i].person.birthday;
                var startdate = sen[i].startdate; 
                if(sen[i].person.twitter!=null)
                {
                    var twitter = sen[i].person.twitter;  
                }
                else{
                    var twitter = "No Twitter ID";
                }
                if(office==null)
                    var office = "No Office";
                }
                if(sen[i].person.youtubeid!=null)
                {
                    var yout = sen[i].person.youtubeid; 
                }
                else{
                    var yout = "No Youtube ID";
                }
                
                
            }
        }
        seninfo += "<tr><td><a href=\"index2.html\">"+ name + "</a></td><td>" + office + "</td><td>" + dob + "</td><td>"+startdate +"</td><td>"+twitter+"</td><td>"+ yout+"</td><td><a href=\""+web+"\">Website link</a></td></tr>";
        seninfo += "</table>"; 
        

    }