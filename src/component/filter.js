import React, { useEffect, useState } from 'react';

const Filter = (props) =>{
    const [filters, setFilters] = useState([
        {
            type:"",
            value: []
        }
    ]);
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
            alert("Error   :  " + hasError + "  :  " + error);
        })
    }, [])

    const getUnique = (objName) => {
                const unique =  [];
                Object.keys(order).forEach(key =>{
                    unique.push(order[key][objName]);
                });
                const newUnique = Array.from(new Set(unique));
                return newUnique;
    }

    const checkExist= (objName) =>{
        var index = filters.findIndex(i => i.type === objName);
        if( index === -1){
            return false;
        }
        else{
            return true;
        }
    }
    const updateValue = (objName,newValue) => {
        var index = filters.findIndex(i => i.type == objName);
        
        let row = filters[index];
        let updateRow = row["value"];
        updateRow = newValue;
        row["value"]=updateRow;

        if (index === -1) {
            alert('Selelct Main option for ' + objName);
        }
        else{
            setFilters([
                ...filters.slice(0,index),
                row,
                ...filters.slice(index + 1)
            ]);
        }
    }
    const updateMultipleValue = (objName,newValue) => {
        var index = filters.findIndex(i => i.type == objName);

        let row = filters[index];
        let updateRow = row["value"];
        updateRow = updateRow.concat(newValue);
        row["value"] = updateRow;
        if (index === -1) {
            alert('Selelct Main option for ' + objName);
        }
        else{
            setFilters([
                ...filters.slice(0,index),
                row,
                ...filters.slice(index + 1)
            ]);
        }
    }

    const handleChange = e => {
        let isCheck = e.target.checked;
        let checkedVal = e.target.value;
        let checkedId = e.target.id;
        var filter = [];
        if(checkedId.includes('main')){
            if(isCheck){
                let isExist = checkExist(checkedVal);
                if(isExist){
                    alert('this option exist');
                }
                else{
                    setFilters([...filters,{
                        type:checkedVal,
                        value:filter
                    }]);
                }
            }
            else{
                setFilters(filters.filter(item => item.type !== checkedVal));
            }
        }
        else{
            if (checkedId.includes('customers')){
                let isMainExist = checkExist("customer_name");
                    if (isMainExist){
                        
                        updateValue("customer_name",checkedVal);
                    }
                    else{
                        alert('Selelct main option for Customer Name');
                    }
            }
            else if (checkedId.includes('status')){
                filter.push(checkedVal);
                if(isCheck){
                    let isMainExist = checkExist("status");
                    if (isMainExist){
                        updateMultipleValue("status",filter);
                    }
                    else{
                        alert('Selelct main option for Status');
                    }
                }
            }
            else if (checkedId.includes('category')){
                filter.push(checkedVal);
                if(isCheck){
                    let isMainExist = checkExist("category");
                    if (isMainExist){
                        updateMultipleValue("category",filter);
                    }
                    else{
                        alert('Selelct main option for Category');
                    }
                }
            }
            else if (checkedId.includes('country')){
                let isMainExist = checkExist("country");
                    if (isMainExist){
                        updateValue("country",checkedVal);
                    }
                    else{
                        alert('Selelct main option for Country');
                    }
            }
            else{
                alert('Error: Ambigous value');
            }
        }
    }

    const getDataForFilters = () => {
        if (isLoaded){
            const uCustomers = getUnique("customer_name");
            const uStatus = getUnique("status");
            const uCategory = getUnique("category");
            const uCountry = getUnique("country");
            return (
                            <table>
                                <tr style={{height:15}}>
                                    <td>
                                        Select criteria filter in listing</td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' id="datemain" name="date" value="created_date" onChange={e => handleChange(e)}/>
                                        <label for="datemain">Created Date</label>
                                    </td>
                                    <td>
                                        Display date
                                        from
                                        <input id="from" type="date" />
                                        to
                                        <input id="to" type="date" />
                                    </td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' id="customersmain" name="customersmain" value="customer_name" onChange={e => handleChange(e)}/>
                                        <label for="customersmain">Customer Name</label></td>
                                    <td>
                                        <select id="customers" name="customers" onChange={e => handleChange(e)}>
                                            
                                            <option value="All" selected>All</option>
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
                                        <input type='checkbox' id="statusmain" name="statusmain" value="status" onChange={e => handleChange(e)}/>
                                        <label for="statusmain">Status</label>
                                    </td>
                                    <td style={{display:'flex'}}>
                                        <input type='checkbox' id="allstatus" value="All" onChange={e=> handleChange(e)}/>
                                        <label for="allstatus" >All</label>
                                        {
                                            uStatus.map((status) => {

                                                return(
                                                    <div id="statusopt" style={{display:'flex', alignItems:'center'}}>
                                                        <input type='checkbox' id={'status' + status} value={status} onChange={e=> handleChange(e)}/>
                                                        <label for={'satus' + status}>{status}</label>
                                                    </div>
                                                );
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' id="categorymain" name="category" value="category" onChange={e => handleChange(e)}/>
                                        <label for="categorymain">Category</label>
                                    </td>
                                    <td style={{display:'flex'}}>
                                        <input type='checkbox' id="AllCat" value="AllCat"/>
                                        <label for="AllCat">All</label>
                                        {
                                            uCategory.map((category) => {
                                                return(
                                                    <div id="categoryopt" style={{display:'flex', alignItems:'center'}}>
                                                        <input type='checkbox' id={'category' + category} value={category} onChange={e=> handleChange(e)}/>
                                                        <label for={'category' + category}>{category}</label>
                                                    </div>
                                                );
                                            })
                                        }
                                    </td>
                                </tr>
                                <tr style={{height:15}}>
                                    <td>
                                        <input type='checkbox' name="country" id="countrymain" value="country" onChange={e => handleChange(e)}/>
                                        <label for="countrymain">Country</label>
                                    </td>
                                    <td>
                                        <select id="country" name="country" onChange={e => handleChange(e)}>
                                            
                                            <option value="All" selected>All</option>
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

    const getFilters = () =>{
        props.onGetFilter(filters);
        props.toggle();
    }
    const cancelFilter = () =>{
        alert("Are you sure you want to leave the filter?");
        props.toggle();
    }
    return(
        <div style={{width:'100%'}}>
            <div id="popupFilter" style={{display:'flex',
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
                            <div>
                                {/* <Apply onClick={props.onGetFilter}/> */}
                                <button onClick={getFilters}>Apply</button>
                                <button onClick={cancelFilter}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;