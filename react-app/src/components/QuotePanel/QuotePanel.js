import React from 'react';
import classes from './QuotePanel.module.css';

class QuotePanel extends React.PureComponent{


    com

    render(){
     
        return(
            <div className={classes.QuotePanel}>
                <div className={classes.Heading}>
                    <h3>Motivational Quote Of The Day</h3>
                </div>
                <div className={classes.Content}>
                    <p>When a dream is written down it becomes a goal.
                        When a goal is divided into simple steps it becomes a plan.
                        When you take action and follow those steps it becomes a reality.</p>
                </div>
            </div>


        );
    }

}


export default QuotePanel;