function barChart(){

	var margin = {top: 80, right: 180, bottom: 120, left: 90},
    width = 800 - margin.left - margin.right,
    height = 600- margin.top - margin.bottom;

var svg = d3.select("#barchart").append("svg")
	.attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
	.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
//var color = d3.scale.category10();
var color = d3.scale.ordinal()
        .range(["#98abc5", "#d0743c", "#ff8c00", "#a05d56", "#8a89a6"]);
d3.csv("static/data/borough_data.csv", function(error, data){

	// filter year
	//var data = data.filter(function(d){return d.Year == '2012';});
	// Get every column value
	var elements = Object.keys(data[0])
		.filter(function(d){
			return ((d != "sn") & (d != "Borough"));
		});
	var selection = elements[0];

	var y = d3.scale.linear()
			.domain([0, d3.max(data, function(d){
				return +d[selection];
			})])
			.range([height, 0]);

	var x = d3.scale.ordinal()
			.domain(data.map(function(d){ return d.Borough;}))
			.rangeBands([5, width]);


	var xAxis = d3.svg.axis()
		.scale(x)
	    .orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
	    .orient("left");

	svg.append("g")
    	.attr("class", "x axis")
    	.attr("transform", "translate(0," + height + ")")
    	.call(xAxis)
    	.selectAll("text")
    	.style("font-size", "20px")
      	.style("text-anchor", "end")
      	.attr("dx", "-.8em")
      	.attr("dy", "-.55em")
      	.attr("transform", "rotate(-90)" );
      	//.attr("fill","white");


 	svg.append("g")
    	.attr("class", "y axis")
    	.call(yAxis);

    /*var label="In dollars"
    if(selection == "Trip_distance")
    	label="In miles"
    else if(selection == "Number_Dispute" || selection=="Passenger_count")
    	label=selection
    else
    	label="In dollars"*/
    svg.append("text")
        .attr("transform", "rotate(-90)")
          .attr("y", -120)
          .attr("x", -130)
          .attr("dy", "5em")
          .style("text-anchor", "middle")
          .attr("id", "yLabel")
          .text("Data");
    

	svg.selectAll("rectangle")
		.data(data)
		.enter()
		.append("rect")
		.attr("class","rectangle")
		.attr("width", (width/data.length)-30)
		.attr("height", function(d){
			return height - y(+d[selection]);
		})
		.attr("x", function(d, i){
			return (width / data.length) * i ;
		})
		.attr("y", function(d){
			return y(+d[selection]);
		})
		.style('fill',function(d,i)
		{
			return color(i);
		})
		.append("title")
		.text(function(d){
			return d.State + " : " + d[selection];
		});

	var selector = d3.select("#drop")
    	.append("select")
    	.attr("id","dropdown")
    	.on("change", function(d){
        	selection = document.getElementById("dropdown");

        	y.domain([0, d3.max(data, function(d){
				return +d[selection.value];})]);

        	yAxis.scale(y);

        var chart= d3.selectAll(".rectangle")
           		.transition()
	            .attr("height", function(d){
					return height - y(+d[selection.value]);
				})
				.attr("x", function(d, i){
					return (width / data.length) * i ;
				})
				.attr("y", function(d){
					return y(+d[selection.value]);
				})
           		.ease("linear")
           		.select("title")
           		.text(function(d){
           			return d.Borough + " : " + d[selection.value];
           		});
      		

           	d3.selectAll("g.y.axis")
           		.transition()
           		.call(yAxis);

         });

    selector.selectAll("option")
      .data(elements)
      .enter().append("option")
      .attr("value", function(d){
        return d;
      })
      .text(function(d){
        return d;
      })


});
}
