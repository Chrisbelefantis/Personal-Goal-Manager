import React, { Component } from 'react';
import classes from './GoalsPanel.module.css';
import GoalSet from '../../components/GoalDisplay/GoalSet/GoalSet';
import axios from '../../axios-instance';


class GoalsPanel extends Component {

    state = {
        goals : []
    };



    goalCheckToggle=(category,id)=>{

        let categoryIndex = this.state.categories.findIndex(categ=>{
            return categ.title === category
        });
     
        let goalIndex = this.state.categories[categoryIndex].content.findIndex(goal=>{
            return goal.id === id
        });

        let categories = [...this.state.categories];

        categories[categoryIndex].content[goalIndex].isChecked = !categories[categoryIndex].content[goalIndex].isChecked
        
        this.setState({
            categories: categories
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


    componentDidMount=()=>{

        axios.get('/goals')
        .then(result=>{
            this.setState(result.data);
            console.log(result.data)
        })
        .catch(err=>{
            console.log(err);
        });


    };

    render(){
    
        //here goes the spinner
        let content = null;
        if(this.state.goals.length)
        {
            content =  this.state.goals.map(categ=>{ 
                return (
                        <GoalSet 
                        key = {categ.title}
                        category = {categ.title}
                        goals = {categ.content}
                        checked={this.goalCheckToggle}
                        expanded={this.goalExpandToggle}/>
                    );
            });
        }


        return(
            
            <div className={classes.GoalsPanel}>
                {content}
            </div>
            

        );

    }

}


export default GoalsPanel;