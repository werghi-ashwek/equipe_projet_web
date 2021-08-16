import React ,{useRef,useEffect,useState}from 'react';
import Notification from './Notification';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';


  


function Countdown({date}) {
    
    const [notify, setNotify] = useState({ isOpen: false, message: '', type: '' })
    const [timerDays,setTimerDays]=useState('00');
    let interval =useRef();
    const startTimer=()=>{
        const countdownDate =new Date(date).getTime();
        interval =setInterval(()=>{
            const now =new Date().getTime();
            const distance =countdownDate - now ;

            const days= Math.floor(distance /(1000*60*60*24)+1);
            
            if (distance<0){
                clearInterval(interval.current);
            }
            else{
                setTimerDays(days);
                
            }

        },1000);
    }
    //componentDidMount
    useEffect(()=>{
        startTimer();
        return()=>{
            clearInterval(interval.current);
        }
    })
    return (
        <section className='timer-container'>
            <section className='timer'>
                <div>
                    <section>
                        <p>{timerDays}<small>  Days</small></p>
                        
                    </section>
                    
                </div>
            </section>
        </section>
    )
}

export default Countdown
