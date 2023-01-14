//alert("connected");


// Class that represent the Cart Item
class CartItem {
    constructor(name, price, qty) {
        this.name = name;
        this.price = price;
        this.qty = qty;
    }
//Method that calculates the total price of the cart item by multiplying price and qunatity
    itemTotal() {
        return this.price * this.qty;
    }
}

// Class that represents the Shopping Cart
class Cart {
    constructor(){ 
        this.orders = []; //Initializes an empty array.
    }
//Method that adds the CartItem object into the empty array above
    addItem(itemobj) {
        this.orders.push(itemobj);
    }
//Method that calculates the subtotal. 
    cartTotal() {

        let total = 0; // accumulator
        //loop through the itemTotal() of each item in the orders array and adds them
        for (let item of this.orders){
            console.log(item);
            total += item.itemTotal(); 
        }
        return  total; //returns final added total value
    }
}

//Array of services offered

const services = [
    {name: "Gel Polish", price: 40},
    {name: "Gel Ext. Full Set", price: 60},
    {name: "Design per nail", price: 5},
    {name: "Pedicure and gel polish", price: 50}
]





 const dropdown = document.getElementById("service"); //dropdown box reference
 const price = document.getElementById("price"); //price per service display reference
 const qty = document.getElementById("qty"); //input field reference
 const cartList = document.getElementById("list"); //list item parent
 const cartButton = document.getElementById("cartButton"); //reference to Add to Cart button
 const display = document.getElementById("subtotal"); //reference to subtotal element
 const cart = new Cart(); // initializez cart object based on Cart class (creates empyt orders array)

 //create a for loop that goes through the array and injects HTML into the dropdown
 for (let i= 0; i < services.length; i++) {
    let option = `<option value="${services[i].name}">${services[i].name}</option>`;
    dropdown.innerHTML += option; 
    // NOTE: the += appends the services as the loop re-iterates.. 
 };

//EVENT LISTENERS
//Add event listener to run the displayPrice function on selection of service
 dropdown.addEventListener("change", displayPrice);
//Run addToCart function on button click
cartButton.addEventListener("click", addToCart);

 //Display default price based on default dropdown selection
 price.innerText = services[0].price;


//this function displays the price of the selected service
function displayPrice () {
    
    //filter the services array looking for a matching name based on the dropdown selection value and store in a variable called result
    const result = services.filter(service => service.name === dropdown.value);
    //inject HTML of the newly created result array into the span element
    price.innerHTML = result[0].price;
}



//addToCart function called on button click
function addToCart () {
 //variable initialization
 let itemName = dropdown.value;
 let itemPrice = parseFloat(price.innerText); //NOTE: parsFloat parses object data from string to float
 let itemQty = parseInt(qty.value); //NOTE: parsInt parses object data from string to integer
 
 const item = new CartItem (itemName, itemPrice, itemQty); //created item object based on CartItem class
 cart.addItem(item); //adds item into the empty orderd array inside of the cart object
 let make_item = `<li> Item Added: ${itemName} [qty: ${itemQty}] = $${item.itemTotal()}`; //displays information of line items purchased
 cartList.innerHTML += make_item; //appends line items
 display.innerHTML = cart.cartTotal(); //updates the subtotal
}