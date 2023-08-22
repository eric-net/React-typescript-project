import "./productswheel.scss";
import "./productswheelresponsive.scss";

import React, { useEffect } from "react";
import {
  layer1Icon1,
  layer1Icon10,
  layer1Icon11,
  layer1Icon12,
  layer1Icon13,
  layer1Icon14,
  layer1Icon2,
  layer1Icon3,
  layer1Icon4,
  layer1Icon5,
  layer1Icon6,
  layer1Icon7,
  layer1Icon8,
  layer1Icon9,
} from "../common/ProductsLayer1Icons";
import {
  layer2Icon1,
  layer2Icon10,
  layer2Icon2,
  layer2Icon3,
  layer2Icon4,
  layer2Icon5,
  layer2Icon6,
  layer2Icon7,
  layer2Icon8,
  layer2Icon9,
} from "../common/ProductsLayer2Icons";
import {
  layer3Icon1,
  layer3Icon2,
  layer3Icon3,
  layer3Icon4,
  layer3Icon5,
} from "../common/ProductsLayer3Icons";


export const ProductsWheel: React.FC = () => {
  const recalculateSize = () => {
    rotateSvgs("layer1", "layer1Svgs");
    rotateSvgs("layer2", "layer2Svgs");
    rotateSvgs("layer3", "layer3Svgs");
  };

  useEffect(() => {
    window.addEventListener("resize", recalculateSize);
    rotateSvgs("layer1", "layer1Svgs");
    rotateSvgs("layer2", "layer2Svgs");
    rotateSvgs("layer3", "layer3Svgs");

    return () => {
      window.removeEventListener("resize", recalculateSize);
    };
  }, []);

  const rotateSvgs = (parent: string, child: string) => {
    if (!document.querySelectorAll(`#${parent}`)) return;

    document.querySelectorAll(`#${parent}`).forEach((circlegraph) => {
      let circles = circlegraph.querySelectorAll<HTMLElement>(`.${child}`);
      let cw =
        parent === "layer1" && circlegraph.clientWidth / 2 < 227
          ? 227.5
          : circlegraph.clientWidth / 2;
      let angle = 360 - 90,
        dangle = 360 / circles.length;
      for (let i = 0; i < circles.length; ++i) {
        let circle = circles[i];
        angle += dangle;
        circle.style.transform = `rotate(${angle}deg) translate(${cw}px) rotate(-${angle}deg)`;
      }
    });
  };

  const layer1Icons = [
    layer1Icon1,
    layer1Icon2,
    layer1Icon3,
    layer1Icon4,
    layer1Icon5,
    layer1Icon6,
    layer1Icon7,
    layer1Icon8,
    layer1Icon9,
    layer1Icon10,
    layer1Icon11,
    layer1Icon12,
    layer1Icon13,
    layer1Icon14,
  ];
  const layer2Icons = [
    layer2Icon1,
    layer2Icon2,
    layer2Icon3,
    layer2Icon4,
    layer2Icon5,
    layer2Icon6,
    layer2Icon7,
    layer2Icon8,
    layer2Icon9,
    layer2Icon10,
  ];
  const layer3Icons = [
    layer3Icon1,
    layer3Icon2,
    layer3Icon3,
    layer3Icon4,
    layer3Icon5,
  ];

  const layer1svgs: any[] = [];
  const layer2svgs: any[] = [];
  const layer3svgs: any[] = [];
  layer1Icons.forEach((element, index) => {
    layer1svgs.push(
      <div className="layer1Svgs svglayer" key={`layer1Svg${index}`}>
        <div className="svgIcon">{element}</div>
      </div>
    );
  });

  layer2Icons.forEach((element, index) => {
    layer2svgs.push(
      <div className="layer2Svgs svglayer" key={`layer2Svg${index}`}>
        <div className="svgIcon">{element}</div>
      </div>
    );
  });

  layer3Icons.forEach((element, index) => {
    layer3svgs.push(
      <div className="layer3Svgs svglayer" key={`layer3Svg${index}`}>
        <div className="svgIcon">{element}</div>
      </div>
    );
  });

  return (
    <div className="productsWheel">
      <div className="layer1circlegraph circlegraph"></div>
      <div id="layer1" className="layer1SvgCirclegraph">
        {layer1svgs}
      </div>
      <div className="layer2circlegraph circlegraph"></div>
      <div id="layer2" className="layer2SvgCirclegraph">
        {layer2svgs}
      </div>
      <div className="layer3circlegraph circlegraph"></div>
      <div id="layer3" className="layer3SvgCirclegraph">
        {layer3svgs}
      </div>
  
    </div>
  );
};
