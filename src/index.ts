#!/usr/bin/env node

import inquirer from "inquirer";

let condition: boolean=true;
let addItem:string;
let addItems:string[]=[]

const countinueFun = async () => {
  const countinue= await inquirer.prompt({
    name: "countinue",
    type: "list",
    message: "Select: ",
    choices: ["Add More","Remove a TODO","See Todo List","Exit"],
  });
  switch (countinue.countinue) {
    case "Add More":
        await addItemFun();
        break;
  
    case "Remove a TODO":
        await removeTODO();
        break;
    case "See Todo List":
        seeTodo();
        break;   
    case "Exit":
        condition=false;
        break;         
  }
};

const addItemFun = async () => {
  const addItemsQ= await inquirer.prompt([
    {
      name: "addItems",
      type: "string",
      message: "Enter Your TODO: ",
    },
  ]);
  if(addItemsQ.addItems){
  addItems.push(addItemsQ.addItems);
  }else{
    console.log("please add someting")
  }
};

const seeTodo =() => {
    if(addItems.length>0)
    {addItems.forEach(element => {
        console.log(element)
    });
}else{
    console.log("Your TODO is Empty")
}
  };

const removeTODO = async () => {
    if(addItems.length>0){
    const remove= await inquirer.prompt({
      name: "remove",
      type: "list",
      message: "What do You Want to Remove",
      choices: addItems,
    });
    if(remove.remove){
        for (let index = 0; index < addItems.length; index++) {
            if(addItems[index]==remove.remove){
               addItems.splice(index,1)
            }
        }
      }else{
        condition=true;
      }
    }else{
        console.log("Your TODO is Empty")
    }
  };  

const start = async () => {
    await addItemFun();
  while (condition) {
    await countinueFun();
  }
};

start();
