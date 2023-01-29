'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


//DOM  ELEMENT
const displayMovements = function(movements , sort = false){
  //to remove already placed html which is in the page
   containerMovements.innerHTML = '';

   //to display all the movement rows with foreach
   movements.forEach(function(mov,i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    //implementing sorting 
    const movs = sort ? movements.slice().sort((a,b)=> a-b) : movements;
    

  //creating the html 
    const html = `<div class="movements__row">
      <div class="movements__type movements__type--${type}">${i + 1}${type}</div>
      <div class="movements__date">3 days ago</div>
      <div class="movements__value">${mov}</div>
    </div> `;
    //displaying the modified html in the page
    containerMovements.insertAdjacentHTML('afterbegin',html);
   });
};
// displayMovements(account1.movements);


//creating username using map method

const user = 'Steven Thomas Williams'; // stw

const createUserNames = function(accounts){

  accounts.forEach(function(acc){
    acc.username = acc.owner.toLowerCase().split(' ').map((function(name){
  return name[0];
})).join('');

  })
  
};
createUserNames(accounts);
console.log(accounts);



//CALCULATING BALANCE
const calcDisplayBalance = function(acc){
  acc.balance = acc.movements.reduce((acc,mov) => acc+ mov , 0 );
  
  labelBalance.textContent = `${acc.balance} EUR`;
};
// calcDisplayBalance(account1.movements);




//DISPLAYIG SUMMARY
const calcDisplaySummary = function(acc){
  const incomes = acc.movements.filter(mov => mov >0)
                          .reduce((acc,mov)=>acc+mov,0);
  labelSumIn.textContent = `${incomes}`;

  const outcomes = acc.movements.filter(mov => mov < 0)
                            .reduce((acc,mov) => acc + mov , 0);
  labelSumOut.textContent = ` ${Math.abs(outcomes)}`;

  const interest = acc.movements.filter(mov => mov >0).map(deposit => deposit * acc.interestRate / 100).reduce((acc,int) => acc + int , 0);
  labelSumInterest.textContent = ` ${interest}`;

};
// calcDisplaySummary(account1.movements);

//updating UI FUNCTION

const updateUI = function(acc){
     //display movements
  displayMovements(acc.movements);
  //display balance
  calcDisplayBalance(acc);
  //display summary
  calcDisplaySummary(acc);
}


//IMPLEMENTING LOGIN (UISING FIND METHOD)
let currentAccount;
//event handlers
btnLogin.addEventListener('click',function(e){
  //prevent form from submitting
  console.log("clicked");
  e.preventDefault();
  
  

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  // console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)){
    // console.log('Login');
  }

  //after we have logged in 
  //display UI
  labelWelcome.textContent = `'Welcome back , ${currentAccount.owner.split(' ')[0]}`;
  containerApp.style.opacity = 100;


  //clearing inpout fields
  inputLoginUsername.value = inputLoginPin.value = '';
  //removing focus from pin
   inputLoginPin.blur();

   updateUI(currentAccount);





  


});

//IMPLEMENTING TANSFERS
btnTransfer.addEventListener('click' , function(e){
  e.preventDefault();

  const amount =Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(acc => acc.username === inputTransferTo.value);

  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();

  if(amount > 0 && recieverAcc && currentAccount.balance >= amount && recieverAcc?.username !== currentAccount.username ){
    //doing the  transfer 
   currentAccount.movements.push(-amount);
   recieverAcc.movements.push(amount);

   //update ui
   updateUI(currentAccount);

  }
});


//IMPLEMENTING REQUEST LOAN
btnLoan.addEventListener('click' , function(e){
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
    //Add movement
    currentAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

//close account //delete account
btnClose.addEventListener('click',function(e){
  e.preventDefault();
  

  if(inputCloseUsername.value===currentAccount.username && Number(inputClosePin.value) === currentAccount.pin){
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    //delete account
    accounts.splice(index,1);
    //hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = '';
});

//sorting
btnSort.addEventListener('click' , function(e){
  e.preventDefault();
  displayMovements(currentAccount.movements , true);
});






/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

//SUMMARY OF ALL THE ARRAY METHODS

// ---TO MUTATE THE ORIGINAL ARRAY

//add to original
//.push
//.unshift

//remove from original
//.pop
//.shift
//.splice

//others
//.reverse
//.sort
//.fill

//--- A NEW ARRAY

//computed from original
//.map

//filtered using condition
//.filter

//portion of original
//.slice

//adding original to other 
//.concat

//flatening the original
//.flat
//.flatMap


//----AN ARRAY INDEX

//based on value
//.indeOf

//based on test condition
//.findIndex


//----AN ARRAY ELEMENT

//based on test condiiton
//.find


//----KNOW IF ARRAY INCLUDES

//based on value
//.includes

//based on test condiition
//.some
//.every


//----A NEW STRING

//based on separator string
//.join


//----TO TRANSFORM TO VALUE

//based on accumulator
//.reduce


//----TO JUST LOOP ARRAY

//based on callback
//.forEach



//------ARRAY METHODS PRACTICE------

//TO CLACULATE HOW MUCH IS TOTAL IN THE BANK

// const 



















// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
//ARRAY METHODS

// let arr = ['a' , 'b','c','d','e'];

//slice method
//extract some part of array without chaniging the original array
//returns the new array 
//arr.slice(beginingIndex),
//arr.slice(begIndex , endIndex)
//endIndex is not included 
// console.log(arr.slice(2));
// console.log(arr.slice(2,4));
// //how to get last element 
// console.log(arr.slice(-1));
// console.log(arr.slice(-2));

// //we can copy the entire array

// console.log(arr.slice());


//splice method
//it changes the originaql array
//arr.splice(position, number of eelements you want to delete includijng the first parameter)
// console.log(arr.splice(2));
// console.log(arr);

// //to remove last element from the array

// console.log(arr.splice(-1));//e removed
// console.log(arr);
// arr.splice(1,2);//b and c removed
// console.log(arr);

//REVERSE METHOD:
//mutate the original array
// const arr2 = ['j' , 'i' , 'h' , 'g' , 'f'];
// console.log(arr2.reverse());
// console.log(arr2);

// //concat method 
// const letters = arr.concat(arr2);
// console.log(letters);

// //JOIN
// console.log(letters.join(' - '));


//FOR EACH LOOP
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];


//FOR OF
// for(const movement of movements){
//   if(movement > 0){
//     console.log(`You deposited ${movement}`);
//   }else{
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// };

// console.log('-------FOR EACH------');

// movements.forEach(function(movement){
//   if(movement > 0){
//     console.log(`You deposited ${movement}`);
//   }else{
//     console.log(`You withdrew ${Math.abs(movement)}`);
//   }
// });

//HOW TO USE INDEX
// for(const [i,movement] of movements.entries()){
//   if(movement > 0){
//     console.log(`Movement ${i + 1}: You deposited ${movement}`);
//   }else{
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
//   }
// };

// console.log('-------FOR EACH------');

// movements.forEach(function(mov , i , arr){
//   if(mov > 0){
//     console.log(`Movement ${i + 1}: You deposited ${mov}`);
//   }else{
//     console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
//   }
// });

//FOR EACH WITH MAPS
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function(value,key,map){
//   console.log(`${key}: ${value}`);
// })

// // FOR EACH WITH SETS
// const currenciesUnique = new Set(['USD' , 'GBP' , 'USD' , 'EUR' , 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function(value , _ , map){
//   console.log(`${value}: ${value}`);
// })

//CODING CHALLANGE 1

// const checkDogs = function(julia , kate){
  


//DATA TANSFORMATIONS

// 1- MAP::returns a new array containing the results of applying an operation on all original elements

// 2-FILTER:: returns a new array containing the array elements that passed a specified test condition

//3-REDUCE:: reduces all array elements down to one single value //ex- adding all elements


//MAP METHOD
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;
// const movementsUSD = movements.map(function(mov){
//   return mov * euroToUsd;
//   // return 23;
// });
// const movementsUSDArr = movements.map((mov) => mov * euroToUsd);
// console.log(movements); // didnt chage the original array
// console.log(movementsUSD);
// console.log(movementsUSDArr);


// const movementsUSDFor = [];
// for(const mov of movements) movementsUSDFor.push(mov*euroToUsd);

// console.log(movementsUSDFor);

// const movementsDescription = movements.map((mov,i) => `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'Withdrew'} ${Math.abs(mov)}`);
// console.log(movementsDescription);

//FILTE METHOD
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const deposits = movements.filter(function(mov){
//   return mov > 0;
// });

// console.log(movements);
// console.log(deposits);

// const withdrawals = movements.filter(function(mov){
//   return mov < 0;
// });
// console.log(withdrawals);

// //REDUCE METHOD
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// //acc : is like a snoball which collects the sum 
// const balance = movements.reduce(function(acc, cur,i,arr){
//   console.log(`Iteration ${i}: ${acc}`);
//   return cur + acc;
// },/*initial value */0);
// console.log(balance);


// //how to get maximum value 
// const max = movements.reduce((acc,mov) =>{
//   if(acc > mov){
//     return acc;
//   }else{
//     return mov;
//   }
// }, movements[0]);
// console.log(max);


// //CONDING CHALLANGE 2
// const dogAge = [5,2,4,1,15,8,3];

// const dogToHuman = function(dogAge){
//    const humanAge = dogAge.map(function(age){
//     if(age <= 2){
//       return 2 * age;
//     }else{
//       return 16 + (age * 4);
//     }
//    });
//    const humanAges =  humanAge.filter(function(age){
//     return age >= 18;
//    });

//    const average = humanAges.reduce((acc,age) => acc + age,0)/ humanAges.length;
//    return average;
// }

// const age1 = dogToHuman([5,2,4,1,15,8,3]);
// const age2 = dogToHuman([16,6,10,5,6,1,4]);

// console.log(age1,age2);


//CHAINING MAP REDUCE AND FILTER METHODS

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const euroToUsd = 1.1;

// const totalDepositsUSD = movements.filter(mov => mov > 0).map((mov,i,arr) =>{
//   // console.log(arr);
//  return  mov * euroToUsd
// }).reduce((acc,mov) => acc + mov , 0);
// console.log(totalDepositsUSD);


//CODING CHALLANGE- 3

// const age1 = [5,2,4,1,15,8,3];
// const age2 = [16,6,10,5,6,1,4];

// const calcAverageHumanAge = function(age1){
//   return age1.map(age => age <= 2 ? 2 * age : 16 + (age * 4)).filter((age , i , arr) => age >= 18).reduce((acc,age ,i, arr) => acc + age/arr.length,0);
// }
// console.log(calcAverageHumanAge(age1));
// console.log(calcAverageHumanAge(age2));


//FIND METHOD
//find particular element according to some condition

//it returns the first element which matches the condition
//it returns the element not the array

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// const firstWithdrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWithdrawal);



//SOME AND EVERY METHOD

//As the includes method seach for equality 
//some method search for a condition

//SOME
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// console.log(movements.some(mov => mov === -130));

// const anyDeposits = movements.some(mov => mov >0);
// console.log(anyDeposits);


// //EVERY
// //if all the elements pass the condition
// console.log(movements.every(mov => mov >0));
// console.log(account4.movements.every(mov => mov >0));



//FLAT METHOD
//it converts the nested array into simple array

// //one level deep
// const arr = [[1,2,3] , [4,5,6] , 7,8];
// console.log(arr.flat());
// //two level deep
// const deepArr = [[[1,2] , 3] , 4 , 5];
// console.log(deepArr.flat(2));


// const accountMovements = accounts.map(acc => acc.movements);
// const allMovements = accountMovements.flat();
// const overallBalance = allMovements.reduce((acc,mov) => acc + mov , 0);
// console.log(accountMovements);
// console.log(allMovements);
// console.log(overallBalance);

//flat
// const overallBalance = accounts
//          .map(acc => acc.movements)
//          .flat()
//          .reduce((acc,mov) => acc + mov , 0);
// console.log(overallBalance);

// //flatMap
// //it combines the use of map and flat 
// const overallBalance2 = accounts
//          .flatMap(acc => acc.movements)
//          .reduce((acc,mov) => acc + mov , 0);
// console.log(overallBalance2);



//SORTING
//this sorting only works on strings 
//it doesnt work on numbers 

// const owners = ['Jonas', 'Zach' , 'Adam' ,'Martha'];

// console.log(owners.sort());


// //sorting on numbers
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// //return < 0 , if a < b (no change in order)
// //return > 0 , if a > b(change in order)

// //sorting in ascending order
// movements.sort((a,b) => {
//   if(a > b) return 1;
//   if(a<b) return -1;

// });

// //or
// movements.sort((a,b) => a-b);
// console.log(movements);

// //sortin in decreasing order
// movements.sort((a,b) =>{
//   if(a>b) return -1;
//   if(a<b) return 1;
// });

// //or
// movements.sort((a,b) => b-a);
// console.log(movements);



//CREATING ARRAYS POGRAMATICALLY

//creates array of 7 elements
// const x = new Array(7);
// console.log(x);

// // x.fill(1);

// //fill with 1 
// //start on index 3
// //end on index 5
// x.fill(1,3,5);

// console.log(x);

// const arr = [1,2,3,4,5,6,7];
// //how to create this array programitically

// const y = Array.from({length:7}, () => 1 );
// console.log(y);

// const z =Array.from({length:7} , (_,i) => i+1);
// console.log(z);






