import React, { useEffect, useState } from 'react';
import Apply from './apply';

//in this part i will use functional component to use hooks
const Filter = () =>{
    const [order, setOrder] = useState([]);
    const [isLoaded, setIsLoded] = useState(false);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        fetch('./config.json')
        .then(
            res => res.json()
        )
        .then(
            (result) => {
                setOrder(result.orders);
                setIsLoded(true);
            }
        )
        .catch(error => {
            setHasError(true);
        })
    }, [])//Preventing Endless Callbacks using Dependencies

    const getUnique = (objName) => {

                // store the values in array
                const unique =  [];
                Object.keys(order).forEach(key =>{
                    unique.push(order[key][objName]);
                });
                return unique;
    }
    const getDataForFilters = () => {
        // let tempArr = [];
        if (isLoaded){
            // Object.keys(order).forEach(key =>{
            //     tempArr.push(order[key]['customer_name']);
            // });
            // let newArr = Array.from(new Set(tempArr));
            //remove duplicate value
            const uCustomers = Array.from(new Set(getUnique("customer_name")));
            const uStatus = Array.from(new Set(getUnique("status")));
            const uCategory = Array.from(new Set(getUnique("category")));
            const uCountry = Array.from(new Set(getUnique("country")));
            return (
                            <table>
                                <tr style={{height:15}}>
                                    <td>
                                        Select criteria filter in listing</td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' id="date" name="date"/>
                                        <label for="date">Created Date</label>
                                    </td>
                                    <td>
                                        Display date
                                        from
                                        <input type="text" />
                                        to
                                        <input type="text" />
                                    </td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' id="customers" name="customers"/>
                                        <label for="customers">Customer Name</label></td>
                                    <td>
                                        <select name="customersopt">
                                            <option value="All">All</option>
                                            {
                                                uCustomers.map((names) => {
                                                    return(
                                                        <option value={names}>{names}</option>
                                                    );
                                                })
                                            }
                                        </select>
                                    </td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' id="status" name="status"/>
                                        <label for="status">Status</label>
                                    </td>
                                    <td style={{display:'flex'}}>
                                        <input type='checkbox' id="AllStatus" value="AllStatus"/>
                                        <label for="AllStatus">All</label>
                                        {
                                            uStatus.map((status) => {
                                                return(
                                                    <div style={{display:'flex', alignItems:'center'}}>
                                                        <input type='checkbox' id={status} value={status}/>
                                                        <label for={status}>{status}</label>
                                                    </div>
                                                );
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' id="category" name="category"/>
                                        <label for="category">Status</label>
                                    </td>
                                    <td style={{display:'flex'}}>
                                        <input type='checkbox' id="AllCat" value="AllCat"/>
                                        <label for="AllCat">All</label>
                                        {
                                            uCategory.map((category) => {
                                                return(
                                                    <div style={{display:'flex', alignItems:'center'}}>
                                                        <input type='checkbox' id={category} value={category}/>
                                                        <label for={category}>{category}</label>
                                                    </div>
                                                );
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' name="country" id="country"/>
                                        <label for="country">Country</label>
                                    </td>
                                    <td>
                                        <select name="countryopt">
                                            <option value="All">All</option>
                                            {
                                                uCountry.map(country => (
                                                    <option value={country}>{country}</option>
                                                ))
                                            }
                                        </select>
                                    </td>
                                </tr>
                            </table>
            );
        }
        else{
            return (<div role="status">
                        {' '}
                        <span> Loading... </span>
                        {' '}
                    </div>);
        }
    }
    return(
        <div style={{width:'100%'}}>
            <div id="popupFilter" style={{display:'flex',
            // backgroundColor:'#555', 
            alignItems:'center', paddingTop:0, paddingLeft:50, paddingRight:50, 
            paddingBottom:50,alignContent:'center', width:'80%', height:'auto',
            justifyContent:'center', flexDirection:'row', position:'absolute',
            zIndex:1, textAlign:'left'}}>

                <div style={{backgroundColor:'whitesmoke', height:'auto',
                width:1000, display:'flex',padding:30}}>
                    <div>
                        <h3>Filters</h3>
                            {
                                getDataForFilters()
                            }
                        <div style={{width:'100%', bottom:0, display:'flex'}}>
                            <div style={{width:'80%'}}>
                                <button >Reset</button>
                            </div>
                            <div style={{display:'flex'}}>
                                <Apply />
                                <button >Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;

// const styles= StyleSheet.create({

// });