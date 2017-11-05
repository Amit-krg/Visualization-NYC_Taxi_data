function scatter_plot(filename) {
    
    if(filename == './data/pca_random.csv')
        document.getElementById("graph_value").innerHTML = "Random: PCA Sampling Scatter Plot";
    if(filename == './data/pca_strat.csv')
        document.getElementById("graph_value").innerHTML = "Stratified: PCA Sampling Scatter Plot";
    else if(filename == './data/mds_rand_correlation.csv')
        document.getElementById("graph_value").innerHTML = "Random: MDS Correlation Scatter Plot";
    else if(filename == './data/mds_strat_correlation.csv')
        document.getElementById("graph_value").innerHTML = "Stratified: MDS Correlation Scatter Plot";
    else if(filename == './data/mds_rand_euclidean.csv')
        document.getElementById("graph_value").innerHTML = "Random: MDS Euclidean Scatter Plot";
    else if(filename == './data/mds_strat_euclidean.csv')
        document.getElementById("graph_value").innerHTML = "Stratified: MDS Euclidean Scatter Plot";


    svg.selectAll("*").remove();
    
    // Load data from file
    d3.csv(filename, function(error, data) {
        data.forEach(function(d) {
            d.col1 = +d.col1;
            d.col2 = +d.col2;
            d.type = +d.type;
        });

        var x_value = function(d) { return d.col1;};
        var y_value = function(d) { return d.col2;};
        
        xScale.domain([d3.min(data, x_value), d3.max(data, x_value)]);
        yScale.domain([d3.min(data, y_value), d3.max(data, y_value)]);
        
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0, "+(h-pad-20)+")")
          .call(xAxis);
 
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate("+(left_pad-pad)+", 0)")
          .call(yAxis);

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", left_pad-80)
        .attr("x",h-530)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Attribute 2");

        svg.append("text")
        .attr("y", left_pad+250)
        .attr("x",450)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Attribute 1");


        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 2.5)
            .attr("cx", function(d){
                return xScale(d.col1);
            }) 
            .attr("cy", function(d){
                return yScale(d.col2);
            }) 
            .style("fill","red")
            .attr("stroke", "black")
            .attr("stroke-width", function(d) {return d/2;});
            ;
    });

}

function plot_values_stratified(filename) {
    
    if(filename == 'pca.csv')
        document.getElementById("graph_value").innerHTML = "PCA (Stratified Sampling) 2D SCATTER PLOT";
    else if(filename == 'correlation.csv')
        document.getElementById("graph_value").innerHTML = "Correlation MDS (Stratified Sampling) 2D SCATTER PLOT";
    else if(filename == 'euclidean.csv')
        document.getElementById("graph_value").innerHTML = "Euclidean MDS (Stratified Sampling) 2D SCATTER PLOT";

    filename = "./" + filename;
    svg.selectAll("*").remove();
    
    var color = ["green","red"];
    // Load data
    d3.csv(filename, function(error, data) {
        data.forEach(function(d) {
            d.a1 = +d.a1;
            d.a2 = +d.a2;
            d.type = +d.type;
        });

        var x_value = function(d) { return d.a1;};
        var y_value = function(d) { return d.a2;};
        
        xScale.domain([d3.min(data, x_value), d3.max(data, x_value)]);
        yScale.domain([d3.min(data, y_value), d3.max(data, y_value)]);
        
        
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate(0, "+(h-pad-30)+")")
          .call(xAxis);
 
        svg.append("g")
          .attr("class", "axis")
          .attr("transform", "translate("+(left_pad-pad+30)+", 0)")
          .call(yAxis);

        svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", left_pad-80)
        .attr("x",h-420)
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Component A");

        svg.append("text")
        .attr("y", left_pad+170)
        .attr("x",h+250)
        .attr("dy", "0em")
        .style("text-anchor", "middle")
        .text("Component B");


        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("r", 2.5)
            .attr("cx", function(d){
                return xScale(d.col1);
            }) 
            .attr("cy", function(d){
                return yScale(d.col2);
            }) 
           .style("fill","red")
            .attr("stroke", "black")
            .attr("stroke-width", function(d) {return d/2;});
            ;
    });

}
