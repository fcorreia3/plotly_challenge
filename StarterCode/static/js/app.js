function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  d3.json("samples.json").then((data) => {

    var metadata = data.metadata;
    var samples = metadata.filter(eachthinginthere => eachthinginthere.id == sample);
    var firstSample = samples[0];
    console.log(sample);
  
  // Possible alternative /////////////////////////////////
    // metadata.forEach((sample) => {selector.append("option")
    // .text(sample).property("value", sample);
    // });
      
    var firstSample = metadata[0];
    ///////// * * * * ///////// * * * * ///// * * * //////////

    // Use d3 to select the panel with id of `#sample-metadata`
    var panel = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    panel.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    firstSample.forEach(([key, value]) => {
      panel.append("p")
      .text(`${key}:${value}`);
    });
  });

}



    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
    // ** NOT DONE **

    
function buildCharts(sample) {

  // @TODO: Use `d3.json` to fetch the sample data for the plots
  d3.json("samples.json").then ((BBdata)=>{

    var samplesData = BBdata.samples;
    var allsamples = samplesData.filter(samplesall=>samplesall.id==sample);
    var eachsample = allsamples[0];
    console.log(eachsample);

    var otuID=eachsample.otu_ids;
    var otuLabels=eachsample.otu_labels;
    var sampleValues=eachsample.sample_values;

    // @TODO: Build a Bubble Chart using the sample data
    var trace = {
      x: otuID,
      y: sampleValues,
      mode:"markers", 
      marker:{
        size: sampleValues,
        color: otuID,
        colorscale: "Rainbow",
        labels: otuLabels,
        type: 'scatter',
        opacity: 0.5
      }
    };

    var data1 = [trace];

    var layout = {
      title: 'OTU Presence',
      xaxis: { title: 'OTU ID' }
    };
    Plotly.newPlot("bubble", data1, layout); 
  });
}
    // @TODO: Build a bar Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
   




function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();