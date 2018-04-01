import React, { Component } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout';
import { LAYOUTS } from './layouts';
import { getLayout, storeLayout } from '../../utils';

const ResponsiveGridLayout = WidthProvider(Responsive);

export class Layout extends Component {
  state = {
    orderbook: true,
    trades: true,
    customLayout: true
  }

  onLayoutChange = (layout) => {
    console.log(layout)
    storeLayout(layout)
  }

  toogleCustomLayout = () => {
    this.setState({ customLayout: !this.state.customLayout })
  }
  render() {
    const { orderbook, trades, customLayout } = this.state;
    const staticComponents = !customLayout
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={LAYOUTS}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 12, md: 10, sm: 6 }}
        autoSize={false}
        onLayoutChange={this.onLayoutChange}
        rowHeight={30}
      >
        <div key="controller" className="grid-controller" data-grid={{x: 0, y: 0, w: 12, h: 1, static: true}} >
          <div onClick={this.toogleCustomLayout}>{customLayout ? 'Custom' : 'static'}</div>
        </div>
        {orderbook && <div key="orderbook" className="grid-box" data-grid={{x:0, y: 1, w: 2, h: 4, minW: 2, maxW: 4, minH: 4, static: staticComponents}} >orderbook</div>}
        {trades && <div key="trades" className="grid-box" data-grid={{x:3, y: 1, w: 2, h: 4, minW: 2, maxW: 4, minH: 4, static: staticComponents}}>trades</div>}
      </ResponsiveGridLayout>
    )
  }
}
