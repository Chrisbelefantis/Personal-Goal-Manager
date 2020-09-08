import React,{Component} from 'react'
import Modal from '../../components/UI/Modal/Modal';
import classes from './EditGoal.module.css';
import Input from '../../components/UI/Input/Input';
import axios from '../../axios-instance';

class EditGoal extends Component{

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
                validity: false
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
                    value: '2020-09-09'
                },
                validation:{
                    required: false
                },
                validity: true
            }
        },
        formIsValid: true
    };


    onChangeHandler=(event,inputLabel)=>{

        for(let key in this.state.editForm){
            if(this.state.editForm[key].elementLabel===inputLabel){
                let updatedEditForm = {...this.state.editForm};
                let updatedSelectedElement = {...updatedEditForm[key]};

                //Add check vality (update validity attribute)
                updatedSelectedElement.elementConfig.value = event.target.value;
                
                //This doesnt work corectly beacause title never gets valid
                //due to the misssing validate stage
                let formIsValid = true;
                for(let inputIndentifiers in updatedEditForm){
                    formIsValid = updatedEditForm[inputIndentifiers].validity && formIsValid;

                }
                
                this.setState({
                    editForm: updatedEditForm,
                    formIsValid: formIsValid
                });

                break;
            }

        }


    }

    componentDidMount=()=>{
        const goalId = this.props.match.params.id;
        axios.get('/goals/'+goalId)
        .then(res=>{

           

            const updatedEditForm = {...this.state.editForm};
            const updatedTitle = {...updatedEditForm['title']};
            const updatedDescription = {...updatedEditForm['description']};
            updatedDescription.elementConfig.value = res.data.description;
            updatedTitle.elementConfig.value = res.data.title;

            updatedEditForm['title'] = updatedTitle;
            updatedEditForm['description'] = updatedDescription;

            console.log(updatedEditForm);

            this.setState({
                editForm: updatedEditForm
            });
            
        })
        .catch(err=>{
            alert(err);
        })
    }


    render(){
        const goalId = this.props.match.params.id;
        let inputElementsArray = [];
        for(let key in this.state.editForm){
            inputElementsArray.push(this.state.editForm[key]);
        }
      
        return(
            <Modal>
                <div className={classes.EditGoal}>
                    Edit Current Goal: {goalId}
                    {inputElementsArray.map(element=>(
                        <Input
                            key = {element.elementLabel}
                            label = {element.elementLabel}
                            elementType = {element.elementType}
                            elementConfig = {element.elementConfig}
                            elementTitle = {element.elementTitle}
                            isValid = {element.validity}
                            changed = {(event)=>this.onChangeHandler(event,element.elementLabel)}/>

                    ))}
                </div>
                
            </Modal>
        );
    }


}

export default EditGoal