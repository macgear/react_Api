import React, { useEffect, useState } from 'react';
import './App.css';
import { getList, setItem } from '../../services/list';

import './App.css';

function App() {
  const [alert, setAlert] = useState(false);
  const [itemInput, setItemInput] = useState('');
  const [list, setList] = useState([]);
  let mounted = true;

    useEffect(() => {
      let mounted = true;
        if(list.length && !alert) {
          return;
        }
          getList()
            .then(items => {
              if(mounted) {
                setList(items)
              }
            })
      return () => mounted = false;
    }, [alert, list])

    useEffect(() => {
      if(alert) {
        setTimeout(() => {
          if(mounted) {
          setAlert(false);
          }
        }, 1000)
      }
    }, [alert])


     {/* OnSubmit est là pour éviter d'envoyer les données cotés back */}
    const handleSubmit = (e) => {
      e.preventDefault();
      setItem(itemInput).then(() => {
        if(mounted) {
          setItemInput('');
          setAlert(true);
          }
        })
    };


  return(
    <div className="wrapper">
        <h1>My Grocery List</h1>
          <ul>
            {list.map(item => <li key={item.item}>{item.item}</li>)}
          </ul>
          {/* OnSubmit est là pour éviter d'envoyer les données cotés back */}
          {/* <form onSubmit={handleSubmit}>  */}
          <form> 
            <label>
              <p>New Item</p>
              <input type="text" onChange={event => setItemInput(event.target.value)} value={itemInput}/>
            </label>
            {/* <button type="submit">Submit</button> */}
            <button name="name" onClick={handleSubmit}>Submit</button>
          </form>
            {alert && <h2> Submit Successful</h2>}
    </div>
  )
}

export default App;

