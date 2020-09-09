import React,{Component} from 'react';
import classes from './NewGoal.module.css';
import Input from '../../components/GoalForm/Input/Input';

class NewGoal extends Component{

    state = {
        editForm:{
            title: {
                elementType: 'input',
                elementLabel: 'title',
                elementTitle: 'Goal Title',
                elementConfig:{
                    type: 'text',
                    id: 'title',
                    placeholder: 'Goal Title',
                    value: ''
                },
                validation:{
                    required: true
                },
                validity: true
            },
            description: {
                elementType: 'textarea',
                elementLabel: 'description',
                elementTitle: 'Description',
                elementConfig:{
                    id: 'description',
                    placeholder: 'Add a quick description of your goal...',
                    rows: 4,
                    columns: 5,
                    value: ''
                },
                validation:{
                    required: false
                },
                validity: true
            },
            dueDate: {
                elementType: 'input',
                elementLabel: 'dueDate',
                elementTitle: 'Due Date',
                elementConfig:{
                    type: 'date',
                    id: 'dueDate',
                    value: ''
                },
                validation:{
                    required: false
                },
                validity: true
            }
        },
        formIsValid: true
    };




    render(){
        let inputElementsArray = [];
        for(let key in this.state.editForm){
            inputElementsArray.push(this.state.editForm[key]);
        }



        return(
            <div className={classes.NewGoal}>

                <h2>SET YOUR NEW GOAL</h2>
                <p>
                    Choose a clear and specific goal in the
                    category of your choice. Always try hitting
                    those goals within fixed a period of time.
                </p>
                <hr />
                

            </div>
        );
    }


}

export default NewGoal