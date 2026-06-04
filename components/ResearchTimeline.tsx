import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { PUBLICATIONS } from '../constants';

const ResearchTimeline: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 250;
    const margin = { top: 30, right: 30, bottom: 40, left: 40 };

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Group publications by year
    const grouped = d3.rollup(
      PUBLICATIONS,
      (v) => v.length,
      (d) => d.year
    );

    const data = Array.from(grouped, ([year, count]) => ({ year, count }))
      .sort((a, b) => a.year - b.year);

    if (data.length === 0) return;
    
    // Ensure we have a nice domain even for few years
    const minYear = data.length === 1 ? data[0].year - 1 : data[0].year;
    const maxYear = data.length === 1 ? data[0].year + 1 : data[data.length - 1].year;

    const x = d3.scaleLinear()
      .domain([minYear - 0.5, maxYear + 0.5])
      .range([margin.left, width - margin.right]);

    const maxCount = d3.max(data, d => d.count) || 0;
    const y = d3.scaleLinear()
      .domain([0, maxCount + 1])
      .range([height - margin.bottom, margin.top]);

    const line = d3.line<{ year: number, count: number }>()
      .x(d => x(d.year))
      .y(d => y(d.count))
      .curve(d3.curveMonotoneX);

    svg.attr("viewBox", `0 0 ${width} ${height}`);
    
    // Define gradient
    const gradient = svg.append("defs")
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", height)
      .attr("x2", 0)
      .attr("y2", 0);
      
    gradient.append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#6366f1")
      .attr("stop-opacity", 0.1);
      
    gradient.append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#4f46e5")
      .attr("stop-opacity", 0.9);

    // Add path
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 4)
      .attr("stroke-linecap", "round")
      .attr("d", line);

    // Optional: Add area under the curve
    const area = d3.area<{ year: number, count: number }>()
      .x(d => x(d.year))
      .y0(height - margin.bottom)
      .y1(d => y(d.count))
      .curve(d3.curveMonotoneX);

    svg.append("path")
      .datum(data)
      .attr("fill", "url(#line-gradient)")
      .attr("opacity", 0.1)
      .attr("d", area);

    // Add dots with tooltip data
    const g = svg.append("g");
    
    g.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => x(d.year))
      .attr("cy", d => y(d.count))
      .attr("r", 6)
      .attr("fill", "#ffffff")
      .attr("stroke", "#4f46e5")
      .attr("stroke-width", 2)
      .attr("class", "transition-all duration-300 hover:r-8 cursor-pointer");
      
    // Add text labels
    g.selectAll("text.label")
      .data(data)
      .enter()
      .append("text")
      .attr("x", d => x(d.year))
      .attr("y", d => y(d.count) - 15)
      .attr("text-anchor", "middle")
      .attr("fill", "currentColor")
      .style("font-size", "12px")
      .style("font-weight", "600")
      .text(d => d.count);

    // Add X axis
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).ticks(data.length).tickFormat(d3.format("d")))
      .attr("color", "currentColor")
      .style("font-family", "Inter")
      .selectAll("text")
      .style("font-size", "12px")
      .attr("dy", "1em");
      
    // Style axis
    svg.selectAll(".domain").attr("stroke-opacity", 0.2);
    svg.selectAll(".tick line").attr("stroke-opacity", 0.2);

  }, []);

  return (
    <div className="w-full text-slate-600 dark:text-slate-400">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default ResearchTimeline;
