import React, {Component} from "react";
import Order from './component/orders';

class App extends Component{
    render(){
        return (
            <div className="App" style={{textAlign:"center"}}>
                <div className="App-header">
                <h1>
                    Sales Order Record
                </h1>
                <br/>
                </div>
                <div className="App-body">
                    <Order />
                </div>
            </div>
        );
    }
}

export default App;