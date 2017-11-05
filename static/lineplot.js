function line_plot(filename) {

    if(filename == './data/dengue_rand_screeplot.csv')
        document.getElementById("graph_value").innerHTML = "Random: Scree Plot";
    else if(filename == './data/dengue_strat_screeplot.csv')
        document.getElementById("graph_value").innerHTML = "Stratified: Scree Plot";

    svg.selectAll("*").remove();

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(14);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(7);

    var valueline = d3.svg.line()
        .x(function(d) { return x(d.dengue_PCA_components); })
        .y(function(d) { return y(d.dengue_eigen_values); });

    var valuebase = d3.svg.line()
        .x(function(d) { return x(d.dengue_PCA_components); })
        .y(function(d) { return y(1); });
        

    d3.csv(filename, function(error, data) {
        data.forEach(function(d) {
            d.dengue_eigen_values = +d.dengue_eigen_values;
            d.dengue_PCA_components = +d.dengue_PCA_components;
        });

        x.domain(d3.extent(data, function(d) { return d.dengue_PCA_components; }));
        y.domain([0, d3.max(data, function(d) { return d.dengue_eigen_values; })]);

        svg.append("path")
            .attr("class", "line")
            .attr("transform", "translate(50,0)")
            .attr("d", valueline(data));

        svg.append("path")
            .attr("class", "line")
            .attr("transform", "translate(50,0)")
            .attr("style","stroke:green")
            .attr("d", valuebase(data));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(50," + height + ")")
            .call(xAxis);

        svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("PCA Components");

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(50,0)")
            .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", left_pad-90)
        .attr("x",h-500)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Eigen Values");

    });
}

function elbow_plot(filename) {
    document.getElementById("graph_value").innerHTML = "Elbow Plot";
    svg.selectAll("*").remove();

    var margin = {top: 30, right: 20, bottom: 30, left: 50},
        width = 600 - margin.left - margin.right,
        height = 300 - margin.top - margin.bottom;

    var x = d3.scale.linear().range([0, width]);
    var y = d3.scale.linear().range([height, 0]);

    var xAxis = d3.svg.axis().scale(x)
        .orient("bottom").ticks(10);

    var yAxis = d3.svg.axis().scale(y)
        .orient("left").ticks(6);

    var valueline = d3.svg.line()
        .x(function(d) { return x(d.K); })
        .y(function(d) { return y(d.k_means_score); });

    var valuebase = d3.svg.line()
        .x(function(d) { return x(d.dengue_PCA_components); })
        .y(function(d) { return y(1); });
        

    d3.csv(filename, function(error, data) {
        data.forEach(function(d) {
            d.K = +d.K;
            d.k_means_score = +d.k_means_score;
        });

        x.domain(d3.extent(data, function(d) { return d.K; }));
        y.domain([0, d3.max(data, function(d) { return d.k_means_score; })]);

        svg.append("path")
            .attr("class", "line")
            .attr("transform", "translate(100,0)")
            .attr("d", valueline(data));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(100," + height + ")")
            .call(xAxis);

        svg.append("text")
        .attr("transform", "translate(" + (width / 2) + " ," + (height + margin.bottom) + ")")
        .style("text-anchor", "middle")
        .text("Cluster Count");

        svg.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(100,0)")
            .call(yAxis);

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", left_pad-90)
        .attr("x",h-400)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("K Means Score");

    });
}
