import { useEffect, useState } from 'react';
import './App.css';
import Diese from './Components/Diese';
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti';

function App() {
  const [data , setData] = useState(allNewDice());
  const [tenz , setTenz] = useState(false);

  useEffect(()=>{
// console.log("Dice state changed");
 const  allHeld =  data.every(e => e.isHeld)
 const firstValue = data[0].value
 const allSameValue = data.every( e => e.value == firstValue)
 if(allHeld && allSameValue){
setTenz(true);
 }



  },[data])

  
  function allNewDice  (){
    const newDice = []
    for (let i = 0; i<10 ; i++){
      newDice.push({value:Math.ceil(Math.random() * 6),
      isHeld:false,
      id:nanoid()
    
    })
    }
    // console.log((newDice));
    return newDice
  }

  // console.log(allNewDice());


  const diceElemnets = data.map(e => <Diese key={e.id} value ={e.value}  isHeld={e.isHeld} id={e.id} fun={()=>fun(e.id)} />)


  function generateNewDie (){
    return {
        value:Math.ceil(Math.random() * 6),
          isHeld:false,
          id:nanoid()
        }
  }
 



  function rollDice(){
    // setData(allNewDice());
    if(!tenz){
      setData(oldData =>oldData.map(e =>{
        return (
          e.isHeld ? e : generateNewDie()
        )
      }))
    }else{
      setTenz(false);
      setData(allNewDice())
    }
   
  }

  function fun (id){
    setData(oldData => oldData.map(e => {
      return    (
        e.id === id ? {...e , isHeld:!e.isHeld} : e
        )
    }))
  }

  return (
    <div>
      <main>
        {tenz && <Confetti />}
        <h1 className='title'>Tnzies</h1>
        <p className='instructions'>Roll untill all dice are the same. Click each die to freeze it at it's curret value between rolls.</p>

        <div className='dice-container'>
          { diceElemnets }
        </div>
        <button className='roll-dice' onClick={rollDice}>
          {tenz ? "Reset" : 'Roll'}
          
          </button>
        
      </main>
    </div>
  );
}

export default App;
