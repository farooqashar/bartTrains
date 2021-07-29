$(document).ready(function(){
   loadAllStations(); 
   $("#station").on("change", function(event){
        let stationAbbr = event.currentTarget.value;
       $("#trains").html("");
        requestData(stationAbbr);
   });
});

function loadAllStations() {
    stations.forEach(station => buildSelectOptionTag(station));
};

function buildSelectOptionTag(station) {
    const optionTag = "<option value = '" + station.stationAbbr + "'>" + station.stationName + "</option>";
    $("#station").append(optionTag);
};

 
function displayEachArrival(arrival) {
    const minutes = arrival.minutes;
    const platform = arrival.platform;
    const len = arrival.length;
    const hexcolor = arrival.hexcolor;

    let elt = "";
    elt += "<strong>Time:</strong> " + minutes + " minutes away.";
    
    elt += "<br/><strong>Platform:</strong> " + platform;
    elt += " | <strong>Length:</strong> " + len;
    $("#trains").append("<li><div style='display: flex;'><div class='trainBox' style='background-color: " + hexcolor + "'></div><div class='trainInfo'>" + elt + "</div></div></li>");
};

function displayEachTrain(train) {
    const dest = train.destination;
    $("#trains").append("<li data-role='list-divider' style='font-size: 1.5em;'>" + dest + "</li>");
    const arrivalsList = train.estimate;
    arrivalsList.forEach(each_arrival => displayEachArrival(each_arrival));
    $("#trains").listview().listview('refresh');

};

function requestData(stationAbbr) {
    let requestURL = "https://api.bart.gov/api/etd.aspx?cmd=etd&orig=" + stationAbbr + "&json=y&key=" + apiKey;
    $.get(requestURL,
    function (data) {
        let trains = data.root.station[0].etd;
        trains.forEach(each_train => displayEachTrain(each_train));
    })
};
