import React, { Component } from 'react'
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import Sidedrawer from '../../components/Navigation/SideDrawer/SideDrawer'

class Layout extends Component{

    state = {
        isDrawerOpen: false
    };

    closeSideDrawerHandler=()=>{

        this.setState({
            isDrawerOpen: false
        });
        
    };

    openSideDrawerHandler=()=>{
        this.setState({
            isDrawerOpen: true
        });
    };

    render(){

       
        return(
            <Aux>
                <Sidedrawer 
                show={this.state.isDrawerOpen}
                closeDrawer={this.closeSideDrawerHandler}/>
                <Toolbar 
                openDrawer={this.openSideDrawerHandler}
                isDrawerClosed = {!this.state.isDrawerOpen}/>
                {this.props.children}
            </Aux>
        );
    }
}

export default Layout;