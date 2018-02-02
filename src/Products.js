import React from 'react';
import ProductTable from './ProductTable.js';
import Websocket from 'react-websocket';
import _ from 'underscore';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: {}
    };

    this.handleData = this.handleData.bind(this);
  }
  
  handleData(obj) {
    let that = this;
    let result = JSON.parse(obj);
    result.forEach((res) => {
      let currentdate = new Date();
      let low = that.state.products[res[0]] ? (that.state.products[res[0]].price > res[1] ? res[1] : that.state.products[res[0]].price) : null;
      let high = that.state.products[res[0]] ? (that.state.products[res[0]].price < res[1] ? res[1] : that.state.products[res[0]].price) : null;
      that.state.products[res[0]] = {
        name:res[0],
        price: res[1],
        classname: res[1] == high ? 'higher' : (res[1] == low ? 'lower' : 'initial'),
        high:high ? high : res[1],
        low:low ? low : res[1],
        updated_at: currentdate.getDate() + "/"
                    + (currentdate.getMonth()+1)  + "/" 
                    + currentdate.getFullYear() + " @ "  
                    + currentdate.getHours() + ":"  
                    + currentdate.getMinutes() + ":" 
                    + currentdate.getSeconds()
      }
    });

    this.setState({
      products : this.state.products
    });
  }

  render() {
    var that = this;
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