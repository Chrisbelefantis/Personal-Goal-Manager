import React, { Component } from 'react';
import classes from './GoalsPanel.module.css';
import GoalSet from '../../components/GoalDisplay/GoalSet/GoalSet';
import axios from '../../axios-instance';
import Spinner from '../../components/UI/Spinner/Spinner';


class GoalsPanel extends Component {

    state = {
        categories : []
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


    componentDidMount=()=>{

        axios.get('/goals')
        .then(result=>{
            this.setState(result.data);
    
        })
        .catch(err=>{
            console.log(err);
        });


    };

    render(){
    
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
                        expanded={this.goalExpandToggle}/>
                    );
            });
        }


        return(
            
            <div className={styleClasses.join(' ')}>
                {content}
            </div>
            

        );

    }

}


export default GoalsPanel;