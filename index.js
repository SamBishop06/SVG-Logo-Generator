// Importing required modules
const filesystem = require("graceful-fs"); // File system module
const inquirer = require("inquirer"); // Inquirer module for user prompts
const { Square, Triangle, Circle } = require("./lib/shapes"); // Importing shape classes

// Svg class for rendering SVG elements
class Svg {
    constructor() {
        this.textElement = ''; // Initialize text element
        this.shapeElement = ''; // Initialize shape element
    }

    // Render method to generate SVG markup
    render() {
        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`;
    }


    // Method to set the text element in SVG
    setTextElement(text, color) {
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`;
    }

    // Method to set the shape element in SVG
    setShapeElement(shape) {
        this.shapeElement = shape.render(); // Render the shape
    }
}

// Array of questions for user input
const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: What 3 letter do you want?:", // Prompt for text input
    },
    {
        type: "input",
        name: "text-color",
        message: "TEXT COLOR: What color do you want your letters?):", // Prompt for text color input
    },
    {
        type: "input",
        name: "shape",
        message: "SHAPE COLOR: Please enter shape color?):", // Prompt for shape color input
    },
    {
        type: "list",
        name: "Background-Shape",
        message: "what shape size do you want??", // Prompt for shape size input
        choices: [ "Triangle", "Square", "Circle"], // Available shape options
    },
];

// Function to write data to a file
function writeToFile(fileName, data) {
    console.log("Writing [" + data + "] to file [" + fileName + "]");
    filesystem.writeFile(fileName, data, function (err) { // Write data to file
        if (err) {
            return console.log(err); // Log error if occurred
        }
        console.log("logo.svg created!"); // Log success message
    });
}

// Function to initialize the program
async function init() {
    console.log("Initializing..."); // Log initialization message
    let svgString = ""; // Initialize SVG string
    let svg_file = "logo.svg"; // Output SVG file name

    // Prompt the user with questions and get answers
    const answers = await inquirer.prompt(questions); // Ask questions and wait for answers

    let user_text = ""; // Initialize user text
    if (answers.text.length > 0 && answers.text.length < 4) {
        // Validate user input for text
        user_text = answers.text; // Assign user input to user_text
    } else {
        console.log("Please use 3 characters or less!"); // Log error message for invalid text length
        return; // Exit function
    }
    console.log("User text: [" + user_text + "]"); // Log user text

    // Get user input for font color and shape color
    user_font_color = answers["text-color"]; // Get font color input
    console.log("Font color: [" + user_font_color + "] has been selected."); // Log font color
    user_shape_color = answers.shape; // Get shape color input
    console.log("Shape color: [" + user_shape_color + "] has been selected."); // Log shape color

    // Get user input for shape type
    user_shape_type = answers["Background-Shape"]; // Get selected shape type
    console.log("Background Shape: [" + user_shape_type + "] has been selected."); // Log selected shape type

    // Create the appropriate shape object based on user input
    let user_shape;
    if (user_shape_type === "Square" || user_shape_type === "square") {
        user_shape = new Square(); // Create Square object
        console.log("User selected Square Shape"); // Log selection
    }
    else if (user_shape_type === "Triangle" || user_shape_type === "triangle") {
        user_shape = new Triangle(); // Create Triangle object
        console.log("User selected Triangle Shape"); // Log selection
    }
    else if (user_shape_type === "Circle" || user_shape_type === "circle") {
        user_shape = new Circle(); // Create Circle object
        console.log("User selected Circle Shape"); // Log selection
    }
    else {
        console.log("Invalid shape!"); // Log error for invalid shape selection
    }
    user_shape.setColor(user_shape_color); // Set shape color

    // Create a new Svg instance and add the shape and text elements to it
    var svg = new Svg(); // Create Svg object
    svg.setTextElement(user_text, user_font_color); // Set text element
    svg.setShapeElement(user_shape); // Set shape element
    svgString = svg.render(); // Generate SVG string

    // Print the generated shape to the console
    console.log("Displaying shape:\n\n" + svgString); // Log generated shape

    // Write the shape to a file
    console.log("Shape creation complete!"); // Log completion message
    console.log("Writing shape to file..."); // Log writing to file message
    writeToFile(svg_file, svgString); // Write SVG string to file
}

// Call the init function to start the program
init(); // Initialize program
