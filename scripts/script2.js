
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

var sen;
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
    j=0;
    var leadInfo = "";
    leadInfo += "<thead><tr><th>Name</th><th>Title</th><th>Party</th></tr></thead><tbody>"; 
    for (var i=0; i <sen.length; i++) 
    {    
         
        var lead = sen[i].leadership_title; 
        
        if(lead != null)    
        {
            var par = sen[i].party;
            if(par=="Democrat")
            {
                name=sen[i].person.firstname + " "+sen[i].person.middlename + " "+sen[i].person.lastname ;            
                leadInfo += "<tr><td style>" + name + "</td><td>" +  lead+ "</td><td>" + par + "</td></tr>";
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
    leadInfo+= "</tbody></table>";   // Close the table element.
    seninfo = "<thead><tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th><th>but</th></tr></thead><tbody>";
    party_list=[];
    state_list=[];
    rank_list=[];
    party_content = {};
    state_content = {};
    rank_content = {};

    function add_element(obj, content, key) {
        if (!(key in obj)) {
            head = "<thead><tr><th>Name</th><th>Party</th><th>State</th><th>Gender</th><th>Rank</th><th>but</th></tr></thead><tbody>"
            obj[key] = [head+content]
        }
        else {
            obj[key].push(content)
        }
    }

    for (var i=0; i <sen.length; i++) 
    { 
        var name=sen[i].person.firstname + " "+sen[i].person.middlename + " "+sen[i].person.lastname ;
        var par = sen[i].party;
        var state = sen[i].state;
        var gend = sen[i].person.gender; 
        var rank = sen[i].senator_rank_label; 

        if (!state_list.includes(state)) {
            state_list.push(state);
        }
        if (!party_list.includes(par)) {
            party_list.push(par);
        }
        
        if (!rank_list.includes(rank)) {
            rank_list.push(rank);
        }
        html = "<tr><td>"+ name + "</a></td><td>" + par + "</td><td>" + state + "</td><td>"+gend +"</td><td>"+rank+"</td><td>"+ "<button onClick=\"page()\">Click me</button></td></tr>"
        seninfo += html;
        add_element(party_content,html,par);
        add_element(state_content,html,state);
        add_element(rank_content,html,rank);
    }
    seninfo += "</tbody></table>";

function buttonContent(array, filter_type) {
    output = "";
    for (i=0; i < array.length; i++) {
        output += "<input type='submit' class='menu' onmouseleave='buttonOnLeave()' value = " + array[i] + " onclick = filter_type(\"" + array[i] + "\",\"" + filter_type + "\");>" ;
    }
    return output;
}
    
    
    // Add the new html code to the div element with id = 'id01'.
    document.getElementById("democratic_count").innerHTML = dem;
    document.getElementById("republican_count").innerHTML = rep;
    document.getElementById("lead_role_info_table").innerHTML = leadInfo;
    document.getElementById("senators_table").innerHTML = seninfo;
    document.getElementById("state_menus").innerHTML = buttonContent(state_list, "state");
    document.getElementById("party_menus").innerHTML = buttonContent(party_list, "party");
    document.getElementById("rank_menus").innerHTML = buttonContent(rank_list, "rank");
    
}



function buttonOnHover(level) {
    let default_value = document.querySelectorAll(".default")[level];
    let menus = document.querySelectorAll(".menus")[level];
    default_value.addEventListener("mouseenter", ()=> {
        menus.classList.toggle("menus_on_click");
    });    
}

function buttonOnLeave(level) {
    let menus = document.querySelectorAll(".menus")[level];
    menus.addEventListener("mouseleave", ()=> {
        menus.classList.remove("menus_on_click");
    });
}

console.log(party_content["Republican"])

function filter_type(value, type) {
    if (type == "party") {
        output = party_content[value] + "</tbody></table>";
    }
    if (type == "state") {
        output = state_content[value] + "</tbody></table>";
    }
    if (type == "rank") {
        output = rank_content[value] + "</tbody></table>";
    }
    if (type == "show") {
        output = seninfo
    }
    document.getElementById("senators_table").innerHTML = output;

}

    
