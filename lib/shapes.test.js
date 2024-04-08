// Importing the shapes module which contains Triangle, Square, and Circle classes
const {Triangle, Square, Circle} = require("./shapes")

// Testing Triangle class
describe('Triangle', () => {
    test('renders correctly', () => {
        // Creating a new Triangle object
        const shape = new Triangle();
        // Setting color for the triangle
        var color =('blue')
        shape.setColor(color);
        // Expecting the rendered triangle to have correct SVG markup
        expect(shape.render()).toEqual(`<polygon height="100%" width="100%" points="0,200 300,200 150,0" fill="${color}">`);
    });
});

// Testing Square class
describe('Square', () => {
    test('renders correctly', () => {
        // Creating a new Square object
        const shape = new Square();
        // Setting color for the square
        var color =('red')
        shape.setColor(color);
        // Expecting the rendered square to have correct SVG markup
        expect(shape.render()).toEqual(`<rect x="50" height="200" width="200" fill="${color}"></rect>`);
    
    });
});

// Testing Circle class
describe('Circle', () => {
    test('renders correctly', () => {
        // Creating a new Circle object
        const shape = new Circle();
        // Setting color for the circle
        var color =('green')
        shape.setColor(color);
        // Expecting the rendered circle to have correct SVG markup
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${color}">`);
    });
});

