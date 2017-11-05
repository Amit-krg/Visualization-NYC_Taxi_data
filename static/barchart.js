function plot_barchart(filename) {
//Reference: http://bl.ocks.org/d3noob/8952219

document.getElementById("graph_value").innerHTML = "Top 3 PCA loadings attributes";

svg.selectAll("*").remove();
var margin = {top: 20, right: 20, bottom: 70, left: 40},
    width = 600 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
    //.tickFormat(d3.time.format("%Y-%m"));

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10);

d3.csv(filename, function(error, data) {

    data.forEach(function(d) {
        d.date = +d.PCA_attributes;
        d.value = +d.Loading_Square;
    });
	
  x.domain(data.map(function(d) { return d.PCA_attributes; }));
  y.domain([0, d3.max(data, function(d) { return d.Loading_Square; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(100," + height + ")")
      .call(xAxis)
    .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", "-.55em")
      .attr("transform", "rotate(-90)" );

  svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Attributes");

  svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(100,0)")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Value ($)");

  svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", left_pad-70)
        .attr("x",h-450)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Loadings Square");

  svg.selectAll("bar")
      .data(data)
    .enter().append("rect")
      .style("fill", function(d,i){ if(i<3){return "green";} else {return "Maroon";}})//"steelblue")
      .attr("transform", "translate(100,0)")
      .attr("x", function(d) { return x(d.PCA_attributes); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.Loading_Square); })
      .attr("height", function(d) { return height - y(d.Loading_Square); });

});
}