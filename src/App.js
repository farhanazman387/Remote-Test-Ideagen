import React, {Component} from "react";
import Order from './component/orders';

class App extends Component{
    render(){
        return (
            <div className="App">
                <div className="App-header">
                <p>
                    Sales Order Record (only class Component)
                </p>
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