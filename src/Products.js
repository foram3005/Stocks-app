import React from 'react';
import ProductTable from './ProductTable.js';
import Websocket from 'react-websocket';
import socketIOClient from "socket.io-client";
import _ from 'underscore';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {},
      response: false,
      endpoint: "http://127.0.0.1:4001"
    };

    this.handleData = this.handleData.bind(this);
  }
  
  handleData(obj) {
    let that = this;
    console.log('=========data=',obj)
    let result = JSON.parse(obj);
    result.forEach((res) => {
      let low = that.state.products[res[0]] ? (that.state.products[res[0]].price > res[1] ? res[1] : that.state.products[res[0]].price) : null;
      let high = that.state.products[res[0]] ? (that.state.products[res[0]].price < res[1] ? res[1] : that.state.products[res[0]].price) : null;
      that.state.products[res[0]] = {
        name:res[0],
        price: res[1],
        classname: res[1] == high ? 'higher' : (res[1] == low ? 'lower' : 'initial'),
        high:high ? high : res[1],
        low:low ? low : res[1],
        updated_at: (new Date()).toString()
      }
    });

    this.setState({
      products : this.state.products
    });
  }

  componentDidMount() {
    // const { endpoint } = this.state;
    // const socket = socketIOClient(endpoint);
    // console.log('====aya======')
    // socket.on("FromAPI", data => this.handleData(data));
    // this.handleData();
  }

  render() {
    var that = this;
    console.log('=====state=',this.state)
    return (
      <div>
        <Websocket url='ws://stocks.mnet.website'
              onMessage={this.handleData.bind(this)}/>
        <div className="table-responsive">
        </div>
        <ProductTable
          products={this.state.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onDestroy={this.handleDestroy}
        ></ProductTable>
      </div>
    );
  }
}

export default Products;