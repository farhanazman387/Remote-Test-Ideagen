import React, { Component } from 'react';
import Filter from './filter';

class Order extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            error:null,
            isLoaded: false,
            orders: [],
            popUp: false,
            filteredResult: []
        };
        this.handleApplyFilter = this.handleApplyFilter.bind(this);
    }

    componentDidMount(){
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

    handlePopup = () =>{
        this.setState({
            popUp: !this.state.popUp
        });
    };

    isExist = (objName,array) =>{
        var index = array.findIndex(i => i.type == objName);

        if(index === -1){
            return false;
        }
        else{
            return true
        }
    }

    handleApplyFilter = (filterList) =>{
        this.state.filteredResult = this.state.orders
        .filter(oriTable => filterList
        .some(filterVal => oriTable[filterVal.type] === filterVal.value));
    };

    render(){
        const { error, isLoaded, orders, filteredResult } = this.state;
        let temporaryResult=[];
        if (error) {
            return<div>Error: {error.message}</div>
        }else if (!isLoaded){
            return <div>Fetching data...</div>
        }else{
            if (filteredResult.length>0){
                temporaryResult = filteredResult;
            }
            else{
                temporaryResult = orders;
            }
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
                            {temporaryResult.map(item =>(
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