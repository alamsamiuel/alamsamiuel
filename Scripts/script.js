var webstore = new Vue({
    el: '#app',
    data: {
        showProduct: true,
        sitename: 'Alam Samiuel - Web Store',
        cartButton: '<i class="fas fa-shopping-cart"></i> Checkout',
        searchTerm: '',
        sortStyle: '',
        cart: [],
        order: {
            Name: '',
            phoneNo: ''
        },
        lessonButton: "<i class='fas fa-plus'></i> Add to cart",
        lessons: lessons,
        inCartButton: "Remove"
    },



    methods: {
    //    Add to Cart
        addToCart: function (lessons) {
            this.cart.push(lessons.id);
            lessons.spaces--;
        },
        
        
        // Check function for lessons
        canAdd: function (lessons) {
            return lessons.spaces > 0;
        },

        // Display Checkout by using boolean values
        showCheckout() {
            this.showProduct = this.showProduct ? false : true;
        },

        // Counting the number of tiems item is present in cart 
        counter(id) {
            let counter = 0;
            for (let i = 0; i < this.cart.length; i++) {
                if (this.cart[i] === id) {
                    counter++;
                }
            }
            if (counter > 0) {
                return counter;
            }
        },

        // Checking if the lesson is in cart at least once
        showInCart(lessons, id) {
            let counter = this.counter(id);
            if (counter > 0) {
                return lessons.name;
            }
        },

        // Placing the order  
        placeOrder() {
            alert('Order Placed!');
            location.reload();
        },

        // Removing the lesson id from the lessons file
        removeFromCart(lessons) {
            const index = this.cart.indexOf(lessons.id);
            if (index > -1) {
                this.cart.splice(index, 1);
            }
            lessons.spaces++;
        }
    },
    computed: {
        // Cart Count function
        cartCount: function () {
            return this.cart.length || '';
        },

        // Cart length function
        cartLenth: function () {
            return cartCount > 0;
        },

        // Low to High price Sorting
        sortedlessons() {
            function compare(a, b) {
                if (a.price > b.price) return 1;
                if (a.price < b.price) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },

        // Sorting the lessons from high to low
        sortedlessonsHigh() {
            function compare(a, b) {
                if (a.price < b.price) return 1;
                if (a.price > b.price) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },

        // Showing Alphabets in increasing order A to Z
        alphabetProducts() {
            function compare(a, b) {
                if (a.name > b.name) return 1;
                if (a.name < b.name) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },

        // Showing Alphabets in reverse order Z to A
        alphabetProductsZ() {
            function compare(a, b) {
                if (a.name < b.name) return 1;
                if (a.name > b.name) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },
       
        
        // Search Field using lambda function
        searchField() {
            return this.lessons.filter(lessons => {
                return (lessons.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                lessons.location.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                    // For the data saved as integers, they get cast to String which lets it match any typed numbers 
                    lessons.price.toString().includes(this.searchTerm.toLowerCase()) ||
                    lessons.spaces.toString().includes(this.searchTerm.toLowerCase()))
            })
        }
    }
});


// Confirm button for the customer to check their order
function btnConfirm() {
    if (document.getElementById("nameid").value >= 5 || document.getElementById("phoneid").value >= 5) {
        document.getElementById('button').disabled = false;
    } else {
        document.getElementById('button').disabled = true;
    }
}     