const cart = require('./cart');
const cars = require('./data/cars');

describe('Cart Properties:', function(){
  test('Cart default should be empty array', function(){
      expect(Array.isArray(cart.cart)).toEqual(true);
      expect(cart.cart.length).toEqual(0);
  })

  test('Total property default should be 0', function(){
      expect(cart.total).toEqual(0);
  })
});

describe('Cart Methods:', function(){
    afterEach(function(){
        cart.cart = [];
        cart.total = 0;
    })

    test('addToCart() should increase by 1 on each call', function(){
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[4]);
        expect(cart.cart.length).toEqual(3);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[2]).toEqual(cars[4]);
    });

    test('addToCart() should increase the total property by car price', function(){
        cart.addToCart(cars[0]);
        cart.addToCart(cars[6]);
        cart.addToCart(cars[1]);
        expect(cart.total).toEqual(cars[0].price + cars[6].price + cars[1].price);
    });

    test('removeFromCart() should successfully remove proper car object from array, and decrease total property', function(){
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[2]);

        cart.removeFromCart(1, cars[1].price);
        expect(cart.cart.length).toEqual(2);
        expect(cart.cart[0]).toEqual(cars[0]);
        expect(cart.cart[1]).toEqual(cars[2]);
        expect(cart.total).toEqual(cars[0].price + cars[2].price);
    });

    test('checkout() should empty cart array and total should equal 0', function(){
        cart.addToCart(cars[0]);
        cart.addToCart(cars[1]);
        cart.addToCart(cars[3]);

        cart.checkout();
        expect(cart.cart.length).toEqual(0);
        expect(cart.total).toEqual(0);
    });
});