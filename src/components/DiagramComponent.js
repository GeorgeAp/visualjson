import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./DiagramComponent.css"; // Import the CSS file for this component

const DiagramComponent = ({ data, isFullScreen }) => { // Accept isFullScreen as a prop
  const diagramRef = useRef();
  const svgRef = useRef();

  const transformData = (obj, key = '') => {
    if (typeof obj !== "object" || obj === null) {
      return { name: key, value: obj };
    }
    return {
      name: key,
      children: Object.entries(obj).map(([k, v]) => transformData(v, k))
    };
  };

  const renderDiagram = () => {
    if (!data || typeof data !== "object") return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const rootData = transformData(data, "root");
    const root = d3.hierarchy(rootData);

    // Get the container's width and height dynamically
    const width = diagramRef.current.clientWidth;
    const height = diagramRef.current.clientHeight;

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .call(d3.zoom().scaleExtent([0.5, 2]).on("zoom", (event) => {
        d3.select(svgRef.current).select("g").attr("transform", event.transform);
      }));

    const svgGroup = svg.append("g");

    // Create a tree layout
    const treeLayout = d3.tree().size([height, width]); // Vertical layout
    treeLayout(root);

    // Update links
    const updateLinks = () => {
      svgGroup.selectAll(".link")
        .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));
    };

    svgGroup.selectAll(".link")
      .data(root.links())
      .enter()
      .append("path")
      .attr("class", "link")
      .attr("fill", "none")
      .attr("stroke", "#ccc");

    const node = svgGroup.selectAll(".node")
      .data(root.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.y},${d.x})`) // Adjust node positions
      .call(d3.drag()
        .on("start", function (event, d) {
          d3.select(this).raise().classed("active", true);
        })
        .on("drag", function (event, d) {
          // Update the position of the dragged node
          const dx = event.dx; // Change in x
          const dy = event.dy; // Change in y

          d.x += dy; // Update y position
          d.y += dx; // Update x position

          // Update the position of the current node
          d3.select(this).attr("transform", `translate(${d.y},${d.x})`);

          // Update all connected edges to this node
          svgGroup.selectAll(".link")
            .data(root.links())
            .attr("d", d3.linkHorizontal().x(d => d.y).y(d => d.x));

        })
        .on("end", function () {
          d3.select(this).classed("active", false);
        })
      );

    node.append("circle")
      .attr("r", 4)
      .attr("fill", "#000");

    node.append("text")
      .attr("dy", -10)
      .attr("x", d => d.children ? -8 : 8)
      .style("text-anchor", d => d.children ? "end" : "start")
      .text(d => d.data.name + (d.data.value !== undefined ? `: ${d.data.value}` : ""));

    updateLinks(); // Call to update the links
  };

  useEffect(() => {
    renderDiagram();
  }, [data]);

  useEffect(() => {
    // Re-render the diagram when the window resizes or when isFullScreen changes
    const handleResize = () => {
      renderDiagram();
    };

    // Call renderDiagram on full screen change
    if (isFullScreen) {
      renderDiagram();
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isFullScreen]); // Add isFullScreen as a dependency

  return (
    <div className="diagram-container" ref={diagramRef}>
      <svg ref={svgRef} className="svg-element" />
      <div className="export-button-container">
        {/* Export button could go here if needed */}
      </div>
    </div>
  );
};

export default DiagramComponent;
