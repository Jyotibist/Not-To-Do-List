
let taskList = []
const entryElm = document.getElementById("entry")
const badElm = document.getElementById("bad");
const tttlHrsPerWeek = 24*7

// capture the data from the form on form submit


const handleOnSubmit = (e) =>{
    const formData = new FormData(e);
    const task = formData.get("task");
    const hr = +formData.get("hr");
    const taskObj = {
        task,
        hr,
        id:randonGenerator(),
        type:"entry",
    };
// check if the new task can fit in the available hours per week
const ttl = totalHours();
if(totalHours()+ hr > tttlHrsPerWeek){
    return alert("Sorry, don't have enough time to fit this task.")
}

// store that data in an array as object
    taskList.push(taskObj)
    displayTask();
  

}

// displaying data in the browser
const displayTask = ()=>{
    console.log(taskList)
    const entryList = taskList.filter((item)=>
        item.type ==="entry");
let str = ""
entryList.map((item,i)=>{
    str +=
    `<tr>
                    
    <td>${item.task}</td>
    <td>${item.hr} hrs</td>
    <td><button class="btn btn-danger btn-sm" onclick = "deleteTask('${item.id}')">
        <i class="fa-sharp fa-solid fa-trash"></i></button>
    <button class="btn btn-success btn-sm" onclick = "switchTask('${item.id}','bad')">
        <i class="fa-sharp fa-solid fa-arrow-right">
        </i>
    </button>
    </td>
    </tr>`;
});
entryElm.innerHTML= str;
displayBadTask();
totalHours();

};

// displaying data in the browser
const displayBadTask = ()=>{
    const badList = taskList.filter((item)=>item.type==="bad");
    let str = "";
    badList.map((item,i)=>{
        str += 
        `<tr> 
        <td>${i+1}</td>
        <td>${item.task}</td>
        <td>${item.hr} hrs</td>
        <td>
            <button class="btn btn-warning btn-sm"
            onClick = "switchTask('${item.id}','entry')">
                <i class="fa-sharp fa-solid fa-arrow-left">
                </i>
            </button>
            <button class="btn btn-danger btn-sm"
            onClick = "deleteTask('${item.id}')"">
            <i class="fa-sharp fa-solid fa-trash"></i>
            </button>
        
        </td>
      </tr>`;
    });

    badElm.innerHTML = str;
    // Total bad hours
const ttlBadHrs = ()=>{
    const ttlBadHrs = badList.reduce((start,item)=>start+ +item.hr,0);
    document.getElementById("ttlBadhrs").innerText = ttlBadHrs;
    return ttlBadHrs;
};
ttlBadHrs();
}

// function for creating unique id
const randonGenerator = (length=6)=>{
 const collection = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"
 let str = "";
 for(let i=0; i<length;i++){
    const randNum = Math.round(Math.random()*collection.length-1);
    str += collection[randNum]
    // console.log(randNum)
 }
 return str;

}

// delete item from array 
const deleteTask = id =>{
    if(window.confirm("Are you sure you want to delete thsi?")){
        taskList = taskList.filter((item)=>
        item.id !==id);
        displayTask();

    }
}

// swtiching task from entry to bad or vice verca
const switchTask = (id,type)=>
{
taskList = taskList.map((item)=>{
    if(item.id===id){
        item.type = type;
    }
    return item ;
});
displayTask();
};


// total hrs
const totalHours = ()=>{
    const ttlHrs = taskList.reduce((acc,{hr})=>acc + +hr,0)
    document.getElementById("total").innerText = ttlHrs;
    return ttlHrs;
}
totalHours();