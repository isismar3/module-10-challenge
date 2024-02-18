const fs = require('fs');
const inquirer = require('inquirer');
const { Shape, Circle, Square, Triangle } = require('./lib/shapes');

class LogoGenerator {
  constructor() {
    this.svgText = '';
    this.svgShape = '';
  }

  generateSVG() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.svgShape}${this.svgText}</svg>`;
  }

  setText(text, color) {
    this.svgText = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
  }

  setShape(shape) {
    this.svgShape = shape.render();
  }
}

const questions = [
  {
    type: 'input',
    name: 'text',
    message: 'please type in your name here',
  },
  {
    type: 'input',
    name: 'textColor',
    message: 'what color would you like the shape color to be? ',
  },
  {
    type: 'input',
    name: 'shapeColor',
    message: 'Enter a Color for Shape (Keyword or Hexadecimal):',
  },
  {
    type: 'list',
    name: 'shape',
    message: 'choose from this list of shapes',
    choices: ["triangle", "circle", "square"]
  },
];

function writeToSVGFile(fileName, data) {
  fs.writeFile(fileName, data, function (err) {
    if (err) {
      return console.log(err);
    }
    console.log('Logo generated and saved as ' + fileName);
  });
}

async function startLogoGenerator() {
  console.log('Initializing Logo Generator...');
  const logo = new LogoGenerator();

  const answers = await inquirer.prompt(questions);

  const { text, textColor, shapeColor, shape } = answers;

  let selectedShape;
  switch (shape.toLowerCase()) {
    case 'circle':
      selectedShape = new Circle();
      break;
    case 'square':
      selectedShape = new Square();
      break;
    case 'triangle':
      selectedShape = new Triangle();
      break;
    default:
      console.log('Invalid shape selected.');
      return;
  }

  selectedShape.makeColor(shapeColor);

  logo.setText(text, textColor);
  logo.setShape(selectedShape);

  const svgData = logo.generateSVG();
  writeToSVGFile('logo.svg', svgData);
}

startLogoGenerator();
// init();








// const fs = require('fs');
// const inquirer = require('inquirer');
// const {Shape, Square, Circle, Triangle} = require("./lib/shapes");
// // const logo = require('./lib/logo.svg')
// class Svg{
//     constructor(){
//         this.shape = ""
//         this.text = ""
//     }

//     static render(userData) {
//         this.text = userData.text
//         this.shape = userData.list
//         let display = ""
//         if(this.shape === "triangle") {
//         display = `<polygon points="50, 160 55, 180 70, 180 60, 190 65, 205 50, 195 35, 205 40, 190 30, 180 45, 180"/>
//         `
//         } else if(this.shape === "square") {
//         display = `<rect x="10" y="10" width="30" height="30"/>
//         <rect x="60" y="10" rx="10" ry="10" width="30" height="30"/>
//         `
//         } else if (this.shape === "circle") {
//         display = `<circle cx="25" cy="75" r="20"/>
//         `
//         } else {
//             console.log("no shape");
//         }
        
//         return `<svg width="300' height="200"> ${this.text} ${display}`
//     }
//     // getShape(shape) {
//     //     this.shape = shapes.render(shape)
//     // }
//     setText() {
        
//         this.text = `the`
//     }

//     static promptUser() {
//         return inquirer.prompt([
//             {
//                 name: 'text',
//                 type: 'input',
//                 message: 'please type in your name here',
//             },
//             {
//                 name: 'color',
//                 type: 'input',
//                 message: 'what color would you like the shape color to be? ',
    
//             },
//             {
//                 name: 'shapeColor',
//                 type: 'input',
//                 message: 'what is the shapes color',
//             },
//             {
//                 name: 'list',
//                 type: 'list',
//                 message: 'choose from this list of shapes',
//                 choices: ["triangle", "circle", "square"]
//             },
    
//         ])}
//         createLogo() {
//             let fileName = 'logo.svg'
//             const shapefile = this.render()
//             fs.writeFile(fileName, shapefile, (err) =>
//             err ? console.log(err) : console.log("success")) 

//         }
//     }

//     function writeToFile(fileName, data) {
//         let content = Svg.render(data);
//         fs.writeFile(fileName, content, function(err) {
//             if(err) {
//                 return console.log(err)
//             }
//             console.log('logo logo.svg')
//         })
//     }

//    async function init() { 
//         const userInput = await Svg.promptUser()
//         writeToFile("logo.svg", userInput);
//         // Svg.createLogo();
//         // (function(data){
//         //     let fileName = 'logo.svg'
//         //     writeToFile(fileName, data);
//         // })
//     }

//     init();