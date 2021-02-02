import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {roundDateToNearestMins} from "../helper/dateHelper";
import ParentTooltip from "./tooltip/ParentTooltip";

import ReactDOM from 'react-dom';


const Timeline = (props) => {
    const {dosages} = props;
    const width = 1000;
    const height = 200;
    const roundToNearestMins = 15;

    let time = new Date().getTime(); //not using state here as D3 won't view updated state...?
    const [medsForTime, setMedsForTime] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const [timeoutIds, setTimeoutIds] = useState([]);
    const [lastTimeoutId, setLastTimeoutId] = useState(0);
    const [targetX, setTargetX] = useState(-200);
    const [targetY, setTargetY] = useState(-200);

    const ref = useRef();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate()+1);
    let xScale = d3.scaleTime()
        .domain([new Date(new Date().toDateString()), new Date(tomorrow.toDateString())])
        .range([0, width-20]);

    useEffect(() => {
        //setup initial svg & x axis
        const svg = d3.select(ref.current)
            .attr("width", width)
            .attr("height", height)
            .style("border", "1px solid black");

        svg.append("g")
            .attr("transform", "translate(0," + (height/2) + ")")
            .call(d3.axisBottom(xScale));
    }, []);

    useEffect(() => {
        draw();
    }, dosages)

    const draw = () => {
        //first step should be we need to massage the data into a form we can use for our timeline.
        //would like to have things grouped by hour. so go through the data and group it into objects by time.
        const timedObjects = {};
        console.log(dosages);
        dosages.forEach(dosage => {
            const {time} = dosage;
            dosage.roundedTime = roundDateToNearestMins(time, roundToNearestMins);
            if (!timedObjects[dosage.roundedTime]) {
                timedObjects[dosage.roundedTime] = [dosage];
            } else {
                timedObjects[dosage.roundedTime].push(dosage);
            }
        });

        console.log(timedObjects);
        const data = Object.values(timedObjects);

        const svg = d3.select(ref.current);

        const rectWidth = getRectWidth(xScale, roundToNearestMins);
        const rectHeight = height/4;

        console.log(data)
        console.log({time: data[0][0].roundedTime, x: xScale(data[0][0].roundedTime)})
        console.log(new Date(new Date().toDateString()))

        let selection = svg.selectAll("rect")
            .data(data)
            .enter().append("rect")
            .attr("x", d => xScale(d[0].roundedTime) - rectWidth/2)
            .attr("width", rectWidth)
            .attr("y", height/2 - rectHeight/2)
            .attr("height", rectHeight)
            .on("mouseenter", (event,data) => {
                const rectPosition = event.target.getBoundingClientRect();
                setTargetX(rectPosition.x + rectPosition.width/2);
                setTargetY(rectPosition.bottom);
                let {roundedTime} = data[0]
                clearAllTimeouts();
                if (roundedTime.getTime() !== time) {
                    time = roundedTime.getTime()
                    setMedsForTime(dosages.filter(dose => dose.roundedTime.getTime() === roundedTime.getTime()));
                    setIsHovered(true);
                }
            })
            .on("mouseout", () => {
                clearAllTimeouts();
                setLastTimeoutId(setTimeout(() => setIsHovered(false), 1000));
                time = 0;
            });
    }

    const clearAllTimeouts = () => {
        //ensuring all timeouts are deleted. as react is asynchronous trying to capture Ids in an array was causing bugs.
        for (let i = 0; i<10 ; i++) {
            clearTimeout(lastTimeoutId-i);
        }
        for (let i = 0; i<50 ; i++) {
            clearTimeout(lastTimeoutId+i);
        }
    }

    return (
        <div>
            <svg ref={ref}/>
            <div>{isHovered ? 1 : 0}</div>
            <ParentTooltip medicationsAtTime={medsForTime} isHovered={isHovered}
                           keepHovered={() => {
                                clearAllTimeouts();
                                setIsHovered(true);
                            }}
                           startHideTimer={() => {
                                clearAllTimeouts();
                               setLastTimeoutId(setTimeout(() => setIsHovered(false), 1000));
                           }}
                           xPos={targetX}
                           yPos={targetY}
            />
        </div>
    );
}

const getRectWidth = (xScale, minsRoundedTo) => {
    let posXMinsInFuture = xScale(new Date(new Date().setMinutes(new Date().getMinutes()+minsRoundedTo)));
    let posNow = xScale(new Date());
    return posXMinsInFuture - posNow;
}

export default Timeline;