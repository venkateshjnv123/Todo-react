import React, { Component, useState } from 'react';
import { getDatabase, ref, set, child , get, onValue, update} from "firebase/database";
import database from '..';
function Todocomplete(props){
    const [txt, settxt] = useState(props.txt);
    const [data, setdata]=useState(props.data);
    var completed = !(data[txt].complete);
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
    return(
        <div key={txt} className="card m-2 col-md-6" >
                        <button className='btn' onClick={handleonclick({txt})}>do</button>
                        {data[txt].complete ? <p className="text-danger m-1 p-1" style={{textDecoration :'line-through'}}> {data[txt].todo}</p> :  <p className="m-1 p-1">{data[txt].todo}</p>}
                       
        </div>
    )
}

export default Todocomplete;