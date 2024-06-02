let statement = document.getElementById('tbinput1');
let description = document.getElementById('tbinput2');
let submit1 = document.getElementById('submit1');

let mood = 'Create'; //variable use to check if we in craete mood or update mood 
let temp ;           // temporary variable to store value of i from updataData function to use in if satement

//create array to store data
    let datahtml2;

    if(localStorage.newitem2 != null){
    datahtml2 = JSON.parse(localStorage.newitem2)  // return array type to its orinal values that change from JSON.stringify(datahtml)
    }
    else{
    datahtml2= [];
    }


//create new data by using object and store inside array then inside local storage
submit1.onclick = function(){
    let newhtml2 = {
        statement: statement.value,
        description: description.value,
    }
    
    if(mood === 'Create'){
        //add object to end of array
        datahtml2.push(newhtml2); 
        //store data from array to locale storage
        // newitem new variable to store data into // JSON to change data type to string
        localStorage.setItem('newitem2', JSON.stringify(datahtml2)  )  
    }
    else{
        datahtml2[temp]=newhtml2;
        mood = 'Create';
        submit1.innerHTML='Create';
    }
         
                                                                      
    cleardata()
    readData()
}


// clear data from text box after we press crate button
function cleardata(){
    statement.value = '';
    description.value = '';
}

//read data from array to show in web
function readData(){
    let table = '';
    //loop to get data from array datahtml and add to table 
    for(let i = 0; i < datahtml2.length; i++){
        //+= means add every time new line and do not delete old one
        table += `
        <tr >
            <td>${datahtml2[i].statement}</td>
            <td> ${datahtml2[i].description} </td>
            <td><button class="btn12" style= "background: #d4edda;"  onclick="updateData(${i})" id="update" >update</button> </td>
            <td><button class="btn12" style= "background: #f8d7da;" onclick="deleteData(${i})" id="delete" >delete</button> </td>
        </tr>`;
    }
    //get table with id equal to tablehtml from html file and add table into it
    document.getElementById('tablehtml').innerHTML = table;


    //create butthon to delete all data from website and from local storage
    //button appear only when there is data in website
    let btnDelete = document.getElementById('deleteAll');
    if(datahtml2.length > 0){
        btnDelete.innerHTML=`
        <button class="btn12" style= "background: #cce5ff; margin:10px;"   onclick='deletAll()'>Delete All</button>`
    }
    else{
        btnDelete.innerHTML = '';
    }
}
readData()


function deleteData(i){
    datahtml2.splice(i,1);  //delete object from array only
    localStorage.newitem2 = JSON.stringify(datahtml2)   // add array again to localStorage after delete object from it
    readData() // use read data to show new data data after user click delete
}

// function used in Delete All button to delete all data from website and from local storage
function deletAll(){
    localStorage.removeItem("newitem")
    datahtml2.splice(0)  //0 to delete all data in array
    readData() // use read data to show new data data after user click delete
}

function updateData(i){
    statement.value = datahtml2[i].statement;
    description.value = datahtml2[i].description;
    submit1.innerHTML='Update';
    mood = 'Update';
    temp = i;
    scroll({
        top:0,
        behavior:'smooth',
    })
}


function searchData(value){
    let table = "";
    for(let i = 0; i < datahtml2.length; i++){
        if(datahtml2[i].statement.includes(value)){
            table += `
                <tr >
                    <td>${datahtml2[i].statement}</td>
                    <td> ${datahtml2[i].description} </td>
                    <td><button class="btn12" style= "background: #d4edda;"  onclick="updateData(${i})" id="update" >update</button> </td>
                    <td><button class="btn12" style= "background: #f8d7da;" onclick="deleteData(${i})" id="delete" >delete</button> </td>
                </tr>`;
        }
    }
    document.getElementById('tablehtml').innerHTML = table;

}

