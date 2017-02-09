import React, { PropTypes } from 'react';

class Crosshair extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.drawCrosshair = this.drawCrosshair.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !(
      (this.props.chart === nextProps.chart) &&
      (this.props.x === nextProps.x) &&
      (this.props.y === nextProps.y)
    );
  }

  componentDidUpdate(prevProps) {
    const { chart } = this.props;
    if (chart !== prevProps.chart) {
      chart.hooks.drawOverlay.push(this.drawCrosshair);
    }

    if (chart) {
      chart.triggerRedrawOverlay();
    }
  }

  drawCrosshair(plot, ctx) {
    const { x, y, lineWidth, color } = this.props;

    const plotOffset = plot.getPlotOffset();

    ctx.save();
    ctx.translate(plotOffset.left, plotOffset.top);

    const o = plot.p2c({ x, y });
    const pixelPos = {
      x: Math.max(0, Math.min(o.left, plot.width())),
      y: Math.max(0, Math.min(o.top, plot.height()))
    };

    const adj = lineWidth % 2 ? 0.5 : 0;

    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    ctx.lineJoin = "round";

    ctx.beginPath();

    const drawX = Math.floor(pixelPos.x) + adj;
    ctx.moveTo(drawX, 0);
    ctx.lineTo(drawX, plot.height());

    const drawY = Math.floor(pixelPos.y) + adj;
    ctx.moveTo(0, drawY);
    ctx.lineTo(plot.width(), drawY);

    ctx.stroke();
    ctx.restore();
  }

  render() {
    return false;
  }
}

Crosshair.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  chart: PropTypes.object,
  lineWidth: PropTypes.number,
  color: PropTypes.string
};

Crosshair.defaultProps = {
  chart: null,
  lineWidth: 1,
  color: "rgb(255, 0, 0)"
};

export default Crosshair;
