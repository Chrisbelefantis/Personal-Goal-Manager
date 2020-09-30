import React, { Component } from 'react';
import classes from './GoalsPanel.module.css';
import GoalSet from '../../components/GoalDisplay/GoalSet/GoalSet';
import axios from '../../axios-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import QuotePanel from '../../components/QuotePanel/QuotePanel';
import EditGoal from '../EditGoal/EditGoal';
import {connect} from 'react-redux';
import {Route,Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/actionCreators';

class GoalsPanel extends Component {


    //Goals changed starts with true in order
    //to be able to load the goals after the autoLogIn
    //Because the local storage is checked after all 
    //components have been mounted
    state = {
        categories : [],
        goalsChanged: true
    };

  

    goalCheckToggle=(category,id)=>{

        let categoryIndex = this.state.categories.findIndex(categ=>{
            return categ.title === category
        });
     
        let goalIndex = this.state.categories[categoryIndex].content.findIndex(goal=>{
            return goal.id === id
        });

        let categories = [...this.state.categories];

        categories[categoryIndex].content[goalIndex].isCompleted = !categories[categoryIndex].content[goalIndex].isCompleted
        
        axios.patch('/goals/'+id,{
            "isCompleted": categories[categoryIndex].content[goalIndex].isCompleted
        })
     

        this.setState({
            categories: categories
        },()=>{
            axios.patch('/goals/'+id,{
                "isCompleted": categories[categoryIndex].content[goalIndex].isCompleted
            })
        });
        
        
        

    };

    goalExpandToggle=(category,id)=>{

        let categoryIndex = this.state.categories.findIndex(categ=>{
            return categ.title === category
        });
     
        let goalIndex = this.state.categories[categoryIndex].content.findIndex(goal=>{
            return goal.id === id
        });

        let categories = [...this.state.categories];

        categories[categoryIndex].content[goalIndex].isExpanded = !categories[categoryIndex].content[goalIndex].isExpanded
        

        this.setState({
            categories: categories
        });


    }

    deleteGoalHandler=(category,id)=>{
        
        let categoryIndex = this.state.categories.findIndex(categ=>{
            return categ.title === category
        });
     
        let goalIndex = this.state.categories[categoryIndex].content.findIndex(goal=>{
            return goal.id === id
        });

        let categories = [...this.state.categories];

        categories[categoryIndex].content.splice(goalIndex,1);


    
        if(categories[categoryIndex].content.length===0){
            categories.splice(categoryIndex,1);
        }


        this.setState({
            categories: categories
        },()=>{
            axios.delete('/goals/'+id)
        });


    }

    raiseGoalChangedFlag=()=>{
        this.setState({
            goalsChanged: true 
        });
    };
    

    componentDidMount=()=>{

        console.log('[Goals Panel] Mounted');
        
        //If it is mounted after login this.props.isLoggedIn in true
        //so we continue
        //If it is mounted after refresh this.props.isLoggedIn is false
        //so we wait for the app component to be mounted and call
        //the appropriate function for autoLogIn
        if(this.props.isLoggedIn)
        {
            console.log("Continue to request");
            axios.get('/goals')
            .then(result=>{
                this.setState(result.data);
        
            })
            .catch(err=>{
                console.log(err);
            });
        }

    };

    componentDidUpdate=()=>{
        

        console.log("[Goals Panel] updated",this.props.isLoggedIn,this.props.token)

        if(this.state.goalsChanged){
            axios.get('/goals')
            .then(result=>{
                this.setState(result.data);
        
            })
            .catch(err=>{
                console.log(err);
            });

            this.setState({
                goalsChanged: false
            })
        }


    }

    render(){
        console.log('[Goals Panel] rendered');
        let styleClasses = [classes.GoalsPanel,classes.Spinner];
        let content = <Spinner/>;
        if(this.state.categories.length)
        {
            styleClasses.pop();
            content =  this.state.categories.map(categ=>{ 
                return (
                        <GoalSet 
                        key = {categ.title}
                        category = {categ.title}
                        goals = {categ.content}
                        delete = {this.deleteGoalHandler}
                        checked={this.goalCheckToggle}
                        expanded={this.goalExpandToggle}
                        />
                    );
            });
        }

        
        return(
           
            this.props.isLoggedIn || !this.props.isLocalStoragedChecked?
            <React.Fragment>
                <div className={styleClasses.join(' ')}>
                    {content}
                </div>
                <QuotePanel/>
                <Route path={this.props.match.path+"/edit/:id"} render={(props)=><EditGoal update={this.raiseGoalChangedFlag} {...props}/>}/>
                
            </React.Fragment>:<Redirect to="/auth"/>

            
            

        );

    }

}

const mapStateToProps = (state)=>{
    return{
        isLoggedIn: state.isAuthenticated,
        token: state.token,
        isLocalStoragedChecked: state.isLocalStoragedChecked
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        onAutoLogIn : ()=>dispatch(actions.authCheckState())
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(GoalsPanel,axios));