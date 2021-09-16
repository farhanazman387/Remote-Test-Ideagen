import React, { Component } from 'react';

class Order extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaded: false,
            orders: []
        };
    }

    componentDidMount(){
        //get all data
        fetch('./config.json')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    orders: result.orders
                });
            },
            (error) => {
                this.setState({
                    isLoaded:true,
                    error
                });
            }
        )
    }

    render(){

        const { error, isLoaded, orders } = this.state;
        if (error) {
            return<div>Erreor: {error.message}</div>
        }else if (!isLoaded){
            return <div>Loading...</div>
        }else{
            return(
                <div>
                    <table style={{textAlign:'center'}}>
                        <thead>
                            <tr>
                                <th style={{width:'200'}}>
                                    Order No.
                                </th>
                                <th style={{width:'200'}}>
                                    Customer Name
                                </th>
                                <th style={{width:'200'}}>
                                    Status
                                </th>
                                <th style={{width:'200'}}>
                                    Category
                                </th>
                                <th style={{width:'200'}}>
                                    Country
                                </th>
                                <th style={{width:'200'}}>
                                    Created Date
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(item =>(
                                <tr>
                                    <td style={{width:'200'}}>
                                        {item.order_no}
                                    </td>
                                    <td style={{width:'200'}}>
                                        {item.customer_name}
                                    </td>
                                    <td style={{width:'200'}}>
                                        {item.status}
                                    </td>
                                    <td style={{width:'200'}}>
                                        {item.category}
                                    </td>
                                    <td style={{width:'200'}}>
                                        {item.country}
                                    </td>
                                    <td style={{width:'200'}}>
                                        {item.created_date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}

export default Order;