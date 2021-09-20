import React, { Component } from 'react';
import Filter from './filter';

class Order extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaded: false,
            orders: [],
            popUp: false
        };
        this.handleApplyFilter = this.handleApplyFilter.bind(this);
    }

    componentDidMount(){
        //get all data using promise
        fetch('./config.json')
        .then(res => res.json())//parse jason
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

    handlePopup = () =>{
        this.setState({
            popUp: !this.state.popUp
        });
    };

    handleApplyFilter = (filterList) =>{
        //this funtion will recieve an array of filter option chose by user
        //this function will handle each condiotion to meet the requirement/query
        console.log(filterList);
    };

    render(){
        //checking if the data is not null, or if there is any error while getting data
        const { error, isLoaded, orders } = this.state;
        if (error) {
            return<div>Error: {error.message}</div>
        }else if (!isLoaded){
            return <div>Fetching data...</div>
        }else{
            return(
                <div style={{width:'100%'}}>
                    <div style={{alignItems:'end', textAlign:'end', paddingTop:30, 
                    paddingBottom:30, paddingRight:100}}>
                        <button type='button' style={{width:'100', height:'30', 
                        fontSize:15}} onClick={this.handlePopup}>Filter data</button>
                    </div>
                    <div>
                        {
                            this.state.popUp ? 
                            <Filter toggle={this.handlePopup} onGetFilter={this.handleApplyFilter}/> 
                            : null
                        }
                    </div>
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