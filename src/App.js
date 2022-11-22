import react, { useState } from "react"

const App =()=>{

   const [input,inputList] = useState()
   const [item,setItem] = useState([])
  const itemEvent=(Event)=>{
   inputList(Event.target.value)
  }
  const listOfItems =()=>{
   setItem((arr)=>{
      return [...item,input]
   })
   inputList("")
  }

return (

 <div className="centre-Div">
    <br />
    <h1 className="h1" >To Do List</h1>  
   <br />
   <input type="text" placeholder="add a task" className="input" onChange={itemEvent} value={input}></input>    
   <button  className="button" onClick={listOfItems}> + </button>
   <br/>
   <ol>
   {
      item.map((val)=>{
         return (<>
            <div className="toDo_Style">
         <i class="fa-Times" are-hidded="true"/>
            <li>{val}</li>
            </div>
            </>)
      })
   }
   
   </ol>
 </div>

    )

}
export default App