import React from 'react';

class ProductRow extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td className={this.props.product.classname}>{this.props.product.price} 
          {
            this.props.product.classname == 'higher' ?
            <span className="float-right">&#x25B2;</span>
            :
            (
              this.props.product.classname == 'lower' ?
                <span className="float-right">&#x25BC;</span>
              : null
            )
            
          }
        </td>
        <td>{this.props.product.high}</td>
        <td>{this.props.product.low}</td>
      </tr>
    );
  }
}

export default ProductRow;