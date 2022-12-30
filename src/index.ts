#!/usr/bin/env node

import inquirer from "inquirer";

let condition: boolean=true;
let addItem:string;
let addItems:string[]=[]

const countinueFun = async () => {
  const countinue= await inquirer.prompt({
    name: "countinue",
    type: "list",
    message: "Do You Want to Add More",
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
    addItems.forEach(element => {
        console.log(element)
    });
  };

const removeTODO = async () => {
    const remove= await inquirer.prompt({
      name: "remove",
      type: "list",
      message: "What do You Want to Remove",
      choices: addItems,
    });
    if(remove.remove){
        for (let index = 0; index < addItems.length; index++) {
            if(addItems[index]==remove.remove){
               delete addItems[index]
            }
        }
      }else{
        condition=true;
      }
  };  

const start = async () => {
    await addItemFun();
  while (condition) {
    await countinueFun();
  }
};

start();
