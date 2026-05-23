const inputslider = document.querySelector("[data-lenghtSlider]");
const lenghtDisplay = document.querySelector("[data-lenghtNumber]");
const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const uppercaseCheck = document.querySelector("#uppercase");
const lowercaseCheck = document.querySelector("#lowercase");
const numberCheck = document.querySelector("#numbers");
const symbolcheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generate = document.querySelector(".generateButton");
const allcheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '`!@#$%^&*()_->={[]}|:;"<,>.?/';

let password = "";
let passwordLength = 2;
let checkCount = 0;
setIndicator("#ccc");
handleSlider();

function handleSlider() {
  inputslider.value = passwordLength;
  lenghtDisplay.innerText = passwordLength;
}

function setIndicator(color) {
  indicator.style.backgroundColor = color;
  // Shadow
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function generateRandomNumber() {
  return getRndInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRndInteger(97, 123));
}

function generateUpperCase() {
  return String.fromCharCode(getRndInteger(65, 91));
}

function generateSymbol() {
  const randNum = getRndInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function calcstrenght() {
  let hasupper = false;
  let haslower = false;
  let hasnumber = false;
  let hassymbol = false;

  if (uppercaseCheck.checked) hasupper = true;
  if (lowercaseCheck.checked) haslower = true;
  if (numberCheck.checked) hasnumber = true;
  if (symbolcheck.checked) hassymbol = true;

  if (hasupper && haslower && (hasnumber || hassymbol) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (haslower || hasupper) &&
    (hasnumber || hassymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied";
    copyMsg.style.backgroundColor = "red";
  } catch (e) {
    copyMsg.innerText = "Failed";
  }
  
  copyMsg.classList.add("active");
  
  setTimeout(function remove() {
    copyMsg.classList.remove("active");
  }, 2000);
}

function shufflePassword(array) {
    //Fisher Yates Method
    for (let i = array.length - 1; i > 0; i--) {
        //random J, find out using random function
        const j = Math.floor(Math.random() * (i + 1));
        //swap number at i index and j index
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
    let str = "";
    array.forEach((el) => (str += el));
    return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allcheckBox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });

    // 
    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }
}


allcheckBox.forEach((checkbox) =>{
    checkbox.addEventListener('change',handleCheckBoxChange);
})

inputslider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});


generate.addEventListener('click',()=>{
    if(checkCount <= 0 ) 
      return;

    if(passwordLength < checkCount)
    {
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let funarr = [];

    if(uppercaseCheck.checked)
        funarr.push(generateUpperCase);
    
     if(lowercaseCheck.checked)
        funarr.push(generateLowerCase);
 
     if(numberCheck.checked)
        funarr.push(generateRandomNumber);

     if(symbolcheck.checked)
        funarr.push(generateSymbol);

    // Compulsory addition

    for(let i=0;i<funarr.length;i++)
    {
        password +=  funarr[i]();
    }
    
    // Remaining

    for(let i=0 ;i<passwordLength-funarr.length;i++)
    {
         let randIndex = getRndInteger(0,funarr.length);
         password += funarr[randIndex]();
    }

    password = shufflePassword(Array.from(password));

    // Display The Password
    passwordDisplay.value = password;

    // Calculate Strenght

    console.log(password);


});


 

// let  APIKEY = 'ceeffc40d10acecec5e2c0f9d99f4b43';

// let newpara = document.createElement('p');
// document.appendChild(newpara);
// newpara.innerText = "Hello Guys";
// console.log(newpara);

// async function showweather() {

//   // let Latitude= '23.0225° N';
//   // let lat = '23.0225° N';

  
//   // let lon = '72.5714° E';
  
//   let sev = await fetch(`https://api.openweathermap.org/data/3.0/onecall?lat=23.02&lon=72.57&exclude={part}&appid=APIKEY`);

//   const output = sev.json();

//   // p.innerText = output;
// }

// showweather(); 

