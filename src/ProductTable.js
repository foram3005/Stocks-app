import React from 'react';
import ProductRow from './ProductRow.js';
import SortableColumnHeader from './SortableColumnHeader.js';

class ProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.sortByKeyAndOrder = this.sortByKeyAndOrder.bind(this);
    this.handleSort = this.handleSort.bind(this);
    this.state = {
      sort: {
        column: 'name',
        direction: 'desc'
      }
    };
  }
  sortByKeyAndOrder(objectA, objectB) {
    let isDesc = this.state.sort.direction === 'desc' ? 1 : -1;
    let [a, b] = [objectA[this.state.sort.column], objectB[this.state.sort.column]];
    if (this.state.sort.column === 'price') {
      [a, b] = [a, b].map((value) => parseFloat(value.replace(/[^\d\.]/g, ''), 10));
    }
    if (a > b) {
      return 1 * isDesc;
    }
    if (a < b) {
      return -1 * isDesc;
    }
    return 0;
  }
  sortProducts() {
    let productsAsArray = Object.keys(this.props.products).map((pid) => this.props.products[pid]);
    return productsAsArray.sort(this.sortByKeyAndOrder);
  }
  
  handleSort(column, direction) {
    this.setState({
      sort: {
        column: column,
        direction: direction
      }
    });
  }

  render() {
    var rows = [];
    this.sortProducts().forEach((product) => {
      rows.push(<ProductRow product={product} key={product.id} onDestroy={this.handleDestroy}></ProductRow>);
    });

    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <SortableColumnHeader
                onSort={this.handleSort}
                currentSort={this.state.sort}
                column="name"
                label="Ticker"
              ></SortableColumnHeader>
              <td>Price</td>
              <td>Last Updated</td>
              <td>High</td>
              <td>Low</td>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
}

export default ProductTable;