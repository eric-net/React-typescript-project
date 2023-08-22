import "./welcome.scss";

import React from "react";

const rotateAngleList = (angleList: any[], dir: number) => {
  if (dir) {
    angleList.unshift(angleList.pop());
  } else {
    angleList.push(angleList.shift());
  }
  return angleList;
};

const getIconPlacement = (rot: any, size: any, max: any) => {
  let style = {};
  if (max) {
    style = {
      transform: `rotate(${
        parseFloat(rot) * 1
      }deg) translate(${size}px) rotate(${parseFloat(rot) * -1}deg)`,
      transition: parseInt(rot) === max ? "none" : "transform .5s ease-in-out",
    };
  } else {
    style = {
      transform: `rotate(${
        parseFloat(rot) * 1
      }deg) translate(${size}px) rotate(${parseFloat(rot) * -1}deg)`,
      transition: parseInt(rot) === 0 ? "none" : "transform .5s ease-in-out",
    };
  }
  return style;
};

const getAngleList = (size: number) => {
  let layer1Rot = 0;
  const angle = 360 / size;
  const angles: number[] = [];

  Array(size)
    .fill(0)
    .forEach(() => {
      angles.push(layer1Rot);
      layer1Rot = layer1Rot + angle;
    });
  return angles;
};
interface props {
  title?: string;
}
interface state {
  layer1Icons: Array<JSX.Element>;
  layer2Icons: Array<JSX.Element>;
  layer3Icons: Array<JSX.Element>;
}

class ProductWheel extends React.Component<props, state> {
  constructor(props: any) {
    super(props);

    this.state = {
      layer1Icons: getAngleList(16).map((x, i) => (
        <img
          key={`layer-1-${i}`}
          style={getIconPlacement(x, -514, false)}
          className="layer-icons"
          src={`img/layer1/img${i + 1}.png`}
        />
      )),
      layer2Icons: getAngleList(9).map((x, i) => (
        <img
          key={`layer-2-${i}`}
          style={getIconPlacement(x, -318, false)}
          className="layer-icons"
          src={`img/layer2/img${i + 1}.png`}
        />
      )),

      layer3Icons: getAngleList(5).map((x, i) => (
        <img
          key={`layer-3-${i}`}
          style={getIconPlacement(x, -151, false)}
          className="layer-icons"
          src={`img/layer3/img${i + 1}.png`}
        />
      )),
    };

    this.renderLayer1();
    this.renderLayer2();
    this.renderLayer3();
  }

  renderLayer1 = () => {
    let layer1Angles = getAngleList(16);
    let icons: JSX.Element[] = [];
    // const max = layer1Angles[layer1Angles.length]

    setInterval(() => {
      icons = [];
      layer1Angles = rotateAngleList(layer1Angles, 0);
      layer1Angles.forEach((x, i) => {
        icons.push(
          <img
            key={`layer-1-${i}`}
            style={getIconPlacement(x, -514, false)}
            className="layer-icons"
            src={`img/layer1/img${i + 1}.png`}
          ></img>
        );
      });

      this.setState({
        layer1Icons: icons,
      });
    }, 1000);
  };
  renderLayer2 = () => {
    let layer2Angles = getAngleList(9);
    let icons: JSX.Element[] = [];
    const max = layer2Angles[layer2Angles.length - 1];

    setInterval(() => {
      icons = [];
      layer2Angles = rotateAngleList(layer2Angles, 1);
      layer2Angles.forEach((x, i) => {
        icons.push(
          <img
            key={`layer-2-${i}`}
            style={getIconPlacement(x, -318, max)}
            className="layer-icons"
            src={`img/layer2/img${i + 1}.png`}
          ></img>
        );
      });

      this.setState({
        layer2Icons: icons,
      });
    }, 1000);
  };
  renderLayer3 = () => {
    let layer3Angles = getAngleList(5);
    let icons: JSX.Element[] = [];
    // const max = layer3Angles[layer3Angles.length]

    setInterval(() => {
      icons = [];
      layer3Angles = rotateAngleList(layer3Angles, 0);
      layer3Angles.forEach((x, i) => {
        icons.push(
          <img
            key={`layer-3-${i}`}
            style={getIconPlacement(x, -151, false)}
            className="layer-icons"
            src={`img/layer3/img${i + 1}.png`}
          ></img>
        );
      });
      this.setState({
        layer3Icons: icons,
      });
    }, 1000);
  };

  render() {
    return (
      <div className="product-wheel">
        <div className="wheel-container">
          <div className="wheel-layer-1">
            {this.state.layer1Icons}
          </div>
        </div>
        <div className="wheel-layer">
          <div className="wheel-layer-2">{this.state.layer2Icons}</div>
        </div>
        <div className="wheel-center">
          <div className="wheel-layer-3">{this.state.layer3Icons}</div>
        </div>
      </div>
    );
  }
}

export default ProductWheel;
