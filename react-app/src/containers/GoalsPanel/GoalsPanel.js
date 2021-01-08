import React, { Component } from 'react';
import classes from './GoalsPanel.module.css';
import GoalSet from '../../components/GoalDisplay/GoalSet/GoalSet';
import EmptyCategory from '../../components/GoalDisplay/EmptyCategory/EmptyCategory';
import axios from '../../axios-instance';
import Spinner from '../../components/UI/Spinner/Spinner';
import PlusIcon from '../../components/UI/PlusIcon/PlusIcon';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import QuotePanel from '../../components/QuotePanel/QuotePanel';
import EditGoal from '../EditGoal/EditGoal';
import ToogleEmptyCategories from '../../components/GoalDisplay/ToogleEmptyCategories/ToogleEmptyCategories';
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
        emptyCategories:[],
        showEmptyCategories: false,
        dataFetched: false,
        goalsChanged: true
    };

  
    fetchAllData=()=>{
        //Fetch Goals
        axios.get('/goals')
        .then(result=>{

            if(result.data){
                this.setState(
                    {
                        ...result.data,
                        dataFetched:true
                    }
                );
            }
            else{
                this.setState({dataFetched: true})
            }
           
            //Fetch the empty Categories
            axios.get('/categories')
            .then(result=>{
                let currentCategoriesIDs = [];
                let emptyCategories = [];
                for(let i=0;i<this.state.categories.length;i++){
                    currentCategoriesIDs.push(this.state.categories[i].id);
                }

                for(let i=0; i<result.data.length; i++){
                    //Not in current categories
                    if(currentCategoriesIDs.indexOf(result.data[i]._id)===-1){
                        emptyCategories.push(result.data[i]);
                    }
                }

                this.setState({
                    emptyCategories: emptyCategories
                })
            })

    
        })
        .catch(err=>{
            console.log(err);
        });

    }



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
    
    plusIconHandler = ()=>{
        this.props.history.push("/new-goal");

    }

    emptyCategoriesHandler=(showEmptyCategories)=>{
        this.setState({
            showEmptyCategories: showEmptyCategories
        });

    }

    componentDidMount=()=>{

        //If it is mounted after login this.props.isLoggedIn in true
        //so we continue

        //If it is mounted after refresh this.props.isLoggedIn is false
        //so we wait for the app component to be mounted and call
        //the appropriate function for autoLogIn

        if(this.props.isLoggedIn){   

            this.fetchAllData();

        }
    };

    componentDidUpdate=()=>{

        if(!this.state.dataFetched && this.props.isLoggedIn){
            this.fetchAllData();

        }
    }

    render(){
      
        let styleClasses = [classes.GoalsPanel,classes.Spinner];
        let content = <Spinner/>;

        if(this.state.dataFetched){

            if(this.state.categories.length>0)
            {
                
                styleClasses.pop();
                let goals =  this.state.categories.map(categ=>{ 
                    return (
                            
                        <GoalSet 
                        key = {categ.id}
                        category = {categ.title}
                        id = {categ.id}
                        goals = {categ.content}
                        delete = {this.deleteGoalHandler}
                        checked={this.goalCheckToggle}
                        expanded={this.goalExpandToggle}
                        />
                    );
                });

                let emptyCategories = null;
                if(this.state.showEmptyCategories){
                    emptyCategories = this.state.emptyCategories.map(categ=>{
                        return(
                            <EmptyCategory
                            key={categ._id}
                            category={categ.title}
                            id={categ._id}
                            />

                        )
                    })
                }
                
                let emptyCategoriesToogler = null;
                if(this.state.emptyCategories.length>0){

                    emptyCategoriesToogler = <ToogleEmptyCategories 
                        key = 'toogler'
                        changed={this.emptyCategoriesHandler}
                        isChecked={this.state.showEmptyCategories}/>

                }

                content = [emptyCategoriesToogler,goals,emptyCategories];


            }
            else if(this.state.categories.length===0){
            
                content = (
                    <React.Fragment>
                        <PlusIcon clicked = {this.plusIconHandler}/>
                        <p style={{textAlign: 'center', color: '#79869f'}}>Press to add a new goal</p>
                    </React.Fragment> 
                );

            }
        
        }

        
        return(
           
            this.props.isLoggedIn || !this.props.isLocalStoragedChecked?
            <React.Fragment>
                <div className={styleClasses.join(' ')}>
                    {content}
                </div>
                <QuotePanel/>
                <Route path={this.props.match.path+"/edit/:id"} render={(props)=><EditGoal update={this.raiseGoalChangedFlag} {...props}/>}/>
                
            </React.Fragment>:<Redirect to="/home"/>

            
            

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