import React, { Component, useState,useEffect } from 'react';
import database from '..';
import { getDatabase, ref, set, child , get, onValue, update,remove} from "firebase/database";

function Todoinput(){
    const [todo, settodo]= useState('');
    const [data,setdata]=useState([]);
    const [completed, setcompleted]=useState(false);
    const [todolist, settodolist]=useState([]);
    const [validation, setvalidation] = useState(false);
    const [loading, setloading] = useState(true);
    const [taskcom , settaskcom]=useState([]);

    function writeUserData(id, todo,completed) {
        const dbref = ref(database);
        set(child(dbref, todo), {
          todo: todo,
          complete: completed,
        });
      }

    const Handleclick=() => {
        if(todo.length <5) {
            setvalidation(true);
        }
        else{
            var id=Math.random();
            todolist.push( {
                id: id,
                todo : todo,
                completed : completed
            });
            writeUserData(id, todo, completed);
            settodo('');
            console.log(todolist);
        }
        
    }
    const Handlevalidation = (e) => {
        settodo(e.target.value);
        var input = document.getElementById("myInput");
        input.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
           event.preventDefault();
           document.getElementById("myBtn").click();
          }
        });
        if(todo.length>=5){
            setvalidation(false);
        }
    }

    const Handletaskcompleted = () => {
        Object.keys(data).map(function(key, index){
                if(data[key].complete==true){
                    const da= data[key]
                    settaskcom(prev=>[...prev, da]);
                    delete data[key];
                    const dbref = ref(database);
                    remove(child(dbref, key));
                };
                
            });
        console.log(taskcom);
    }
    const getdata = () => {
        const dbRef = ref(database);
        // get(child(dbRef, 'value')).then((snapshot) => {
        //   if (snapshot.exists()) {
        //     setdata(snapshot.val());
        //     console.log(data);
        //   } else {
        //     console.log("No data available");
        //   }
        // }).catch((error) => {
        //   console.error(error);
        // });
        
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setdata(data);
            

    }) 
    setloading(false);
 };

 const handleonclick = ({txt}) => {
    const dbref = ref(database);
    if(data!=null ){
        if(data[txt].complete == false){
            update(ref(database, txt), {
                complete: true,
              });
        }
        
        else if(data[txt].complete == true){
            update(ref(database, txt), {
                complete: false,
              });
        }
    }
    
};

useEffect( () => {   
    getdata();
console.log(data);
console.log(Object.keys(data));
    }, []);
    return(
        <div className="row">
            <div className="col-md-6 pt-3 mt-4" >
                <p className="m-1 p-1 text-bold text-align-left" style={{fontSize : '25px'}} > Todo-app</p>
            <div className="card col-md-8 py-1 my-1 " style={{boxShadow : '2px 3px #6d706e'}} >
                <label id='myInput' className="text-align-left m-1 p-1" >Enter your todo:</label>
                <div className="col" >
                <input id='myInput' type='text' className='form-control' style={{width: '80%'}} value={todo} onChange={Handlevalidation}/>
                <button className="btn btn-primary m-2 p-1" style={{maxWidth:"250px"}} type='submit' id="myBtn" name="submit" onClick ={Handleclick} >Submit</button>
                </div>
                {
                    validation ? <p className="text-danger">length should be more than 5</p> : <></>
                }
            </div>

            <p className="my-1 py-2 text-bold"> -: Todo-List :- </p>
            <div>
            {
                data == null ?
                <p>loading...</p> :
                Object.keys(data).map( txt => (
                    <div key={txt} className="card m-2 col-md-6" onClick={() => handleonclick({txt})} style={{boxShadow : '2px 3px #6d706e'}}>
                    {data[txt].complete ? <p className="text-danger m-1 p-1" style={{textDecoration :'line-through'}}> {data[txt].todo}</p> :  <p className="m-1 p-1">{data[txt].todo}</p>}
                   
    </div>
                ))
                
            }
            </div>
        </div>

        <div className="col-md-6 pt-5 mt-4">
            <button className="btn btn-danger" onClick={()=>Handletaskcompleted()}>Remove completed tasks</button>
            {
                taskcom.length == 0 ?
                <p className="m-1 p-1">Your completed tasks are shown here</p> :
                Object.keys(taskcom).map( txt => (
                    <div key={txt} className="card m-2 col-md-6">
                    <p className="text-danger m-1 p-1"> {taskcom[txt].todo}</p> 
                   
    </div>
                ))
                
            }
            <p className="m-2 p-2" style={{float:'bottom',position:'absolute', bottom:'5px'}}>Note - completed tasks are not updated into the database, so every state change deletes all the completed tasks.</p>
            
        </div>
        </div>
    )
}

export default Todoinput;