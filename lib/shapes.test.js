const {Shapes, Square, Triangle, Circle} = require('./shapes.js')

describe ('square', () => {
    test('is a shape', () => {
        const shape = new Square();
        let color = ('pink')
        shape.makeColor(color);
        expect(shape.render()).toEqual(`<rect x="75" y="25" width="150" height="150" fill = "${color}"/>`);
    });
});

describe ('circle', () => {
    test('is a shape', () => {
        const shape = new Circle();
        let color = ('purple')
        shape.makeColor(color);
        expect(shape.render()).toEqual(`<circle cx="150" cy="100" r="100" fill = "${color}"/>`);
    });
});

describe ('triangle', () => {
    test('is a shape', () => {
        const shape = new Triangle();
        let color = ('brown')
        shape.makeColor(color);
        expect(shape.render()).toEqual(`<polygon points="150, 18 244, 182 56, 182" fill = "${color}"/>`);
    });
});