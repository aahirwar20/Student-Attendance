import React, { useState, useEffect } from "react";

function Attandance(){
    const [count, setCount]=useState(0);                                                         //no of present student
    const [data, setData]=useState(new Map());                                                    // map of present student
    const [outdata, setOutdata]=useState(new Map());                                              //map of exit student    
    const [name, setName] = useState({name: "",Rollno: ""});                                      // student data at entry point         
    const [oname, setOname] = useState({name: "",Rollno: ""});                                     //student data at exit point
    const [find_rollno, setfind_rollno]=useState("")                                                      //finding rollno of student           
    const [find, setFind] = useState({Rollno: "",name:  "",Present: "",Checkin_Time : "",Checkout_Time : ""});     //store the find data of student
    
    useEffect(()=>{setCount(() =>{                     // use effect for changing attandance when when entry change
      return data.size;
    });},[data]);
   
    

    const handleChange = (event) => {                       //Enter name in entry
         const value = event.target.value;
        setName((old)=>( { ...old,name: value}))
      }

    const handleChange2 = (event) => {                      //Enter Roll No in entry
        const value = event.target.value;
       setName((old)=>( { ...old,Rollno: value}))
     } 
     
     
   function Time(){    
      let time=new Date();                               //create Time
       return (time.getHours()+":"+time.getMinutes()+":"+time.getMilliseconds());
     }
    

    const handleSubmit = (event) => {                          //submit Entry
        event.preventDefault();
        
        setData(()=>{
                    if(data.has(name.Rollno)){}
                    else{  data.set(name.Rollno,{name:name.name,Present:true,Checkin_Time :Time(),Checkout_Time :""}) 
                 }
                 setName({name: "",Rollno: ""}) 
                return new Map(data);});
      }
     

    const Exit_handleChange = (event) => {                                 //Enter name in exit
     
        const value = event.target.value;
      setOname((old)=>( { ...old,name: value}))
      
       }
     

   const Exit_handleChange2 = (event) => {                                        //Enter Roll no in exit
       const value = event.target.value;

      setOname((old)=>( { ...old,Rollno: value}))
    } 
    
    
    function curr_obj(t){                                                       //Given data of user for  exit
       t.Checkout_Time =Time();
      t.Present=false;
      return t;
    }



    const Exit_handleSubmit = (event) => {                                       //Submit Exit
     
       event.preventDefault();
       setData(()=>{ if(data.has(oname.Rollno)){
        let curr_d=data.get(oname.Rollno);
        setOutdata(()=>{ 
          if(!outdata.has(oname.Rollno)){
          outdata.set(oname.Rollno,curr_obj(curr_d))
          }
          return new Map(outdata);
        })
        data.delete(oname.Rollno)}
        setOname({name: "",Rollno: ""})
         return new Map(data); })
      }
   

    const handleFindRollNo=(event)=> {
      const value = event.target.value;
      setfind_rollno(()=>{ return value;})
    } 

    const handleFind = (event) => {                                       //Submit Exit
    //  console.log(find);
        event.preventDefault();
        if(data.has(find_rollno)){                                              //find in the present students
          let t=data.get(find_rollno);
          setFind((predata)=>{
            return {...predata,Rollno:find_rollno,name:t.name,Present:"Present ",Checkin_Time :t.Checkin_Time ,Checkout_Time :t.Checkout_Time }
          })
        }

        else if(outdata.has(find_rollno)){                                       // find in the exit students
          let t=outdata.get(find_rollno);
          setFind((predata)=>{
            return {...predata,Rollno:find_rollno,name:t.name,Present:"Not present",Checkin_Time :t.Checkin_Time ,Checkout_Time :t.Checkout_Time }
          })
        }

        else{                                                        //students did not come
          setFind((predata)=>{
            return {...predata,Rollno:find_rollno,name:" ",Present:"Not present",Checkin_Time :" ",Checkout_Time :" "}
          })
        }
       }

  function Sd(){                                          //give data of student
   
      return (<> 
      <h4> {find.Present}</h4>
      <p> Roll No: {find.Rollno},  Name: {find.name}, Checkin_Time: {find.Checkin_Time },  Checkout_Time:{find.Checkout_Time } </p>
        </>)
   
   }    
    
   



 return (<>
  <h1>Attandance - {count}</h1>                                          
    <form onSubmit={handleSubmit}>                                                      { /*  students entry form */}
    <h3>Entery: </h3>

    <label>  Enter your Rollno:
    <input 
      type="text" 
      name="Rollno" 
      value={name.Rollno || ""} 
      onChange={handleChange2}
    />
    </label>  
  <label>Enter your name:
  <input 
    type="text" 
    name="name" 
    value={name.name || ""} 
    onChange={handleChange}
  />
  </label>
  <input type="submit" />
   </form>

  <form onSubmit={Exit_handleSubmit}>                                       { /*  students exit form */}
    <h3>Exit: </h3>
   
    <label>  Enter your Rollno:
    <input 
      type="text" 
      name="oRollno" 
      value={oname.Rollno || ""} 
      onChange={Exit_handleChange2}
     />
    </label>
    <label>Enter your name:
    <input 
    type="text" 
    name="ousername" 
    value={oname.name || ""} 
    onChange={Exit_handleChange}
     />
   </label>
   <input type="submit" />
  </form>


  <form onSubmit={handleFind}>                                          { /*  students finding data form */}
    <h3>Find Data: </h3>
   <label>   your Rollno:
    <input 
      type="text" 
      name="find" 
      value={find_rollno || ""} 
      onChange={handleFindRollNo}
    />
    </label>
    <input type="submit" />
  </form>
   
  <Sd/>
   </>
 );
}


export default Attandance;