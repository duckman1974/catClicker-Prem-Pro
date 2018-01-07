/* ======= Model ======= */

var model = {
    currentCat: null,
    cats: [
        {
            clickCount : 0,
            name : 'Kevin',
            imgSrc : 'img/kitten.jpg'
        },
        {
            clickCount : 0,
            name : 'Candice',
            imgSrc : 'img/secondCat.jpg'
        },
        {
            clickCount : 0,
            name : 'Natalie',
            imgSrc : 'img/3rdCat.jpg'
        },
        {
            clickCount : 0,
            name : 'Cassidy',
            imgSrc : 'img/4thCat.jpg'
        }
    ]
};


/* ======= Octopus ======= */

var octopus = {

    init: function() {
        // set our current cat to the first one in the list
        model.currentCat = model.cats[0];
        model.admin = false;

        // tell our views to initialize
        catListView.init();
        catView.init();
        adminView.init();
    },

    getCurrentCat: function() {
        return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    // set the currently-selected cat to the object passed in
    setCurrentCat: function(cat) {
        model.currentCat = cat;
    },

    // increments the counter for the currently-selected cat
    incrementCounter: function() {
        model.currentCat.clickCount++;
        catView.render();
    }


};


/* ======= View ======= */

var adminView = {

    init : function() {

      // this.newCatNameElem = document.getElementById("catName");
      // this.newCatUrlElem = document.getElementById("catUrl");
      // this.newCatClicksElem = document.getElementById("catClicks");
      this.adminBtn = document.getElementById("admin-btn");
      this.cancelBtn = document.getElementById("cancel-btn");
      this.saveBtn = document.getElementById("save-btn");

      //form initially hides.  will need to show when admin button clicked
      $('#admin-form').hide();

      // admin form click listener
      this.adminBtn.addEventListener('click', function() {
        $('#admin-form').show();

        // var currentCatName = currentCatObj.name;
        // var currentCatLink = currentCatObj.imgSrc;
        // var currentCatCount = currentCatObj.clickCount;
      });

      // cancel button click listener
      this.cancelBtn.addEventListener('click', function() {
        $('#admin-form').hide();
      });

      // save button click listener
      var that = this;

      this.saveBtn.addEventListener('click', function() {
        var newCat = document.getElementById('catName').value;
        var newUrl = document.getElementById('catUrl').value;
        var newClicks = document.getElementById('catClicks').value;
        var currentCatObj = octopus.getCurrentCat();
        currentCatObj.name = newCat;
        if (newUrl != null) {
          currentCatObj.imgSrc = newUrl;
        }
        else {
          currentCatObj.imgSrc = currentCatObj.imgSrc;
        }
        currentCatObj.clickCount = newClicks;
        console.log(currentCatObj);
        //
        catView.render();
        // catListView.render();
        // $('admin-form').hide();
      });
    }

};

var catView = {

    init: function() {
        // store pointers to our DOM elements for easy access later
        this.catElem = document.getElementById('cat');
        this.catNameElem = document.getElementById('cat-name');
        this.catImageElem = document.getElementById('cat-image');
        this.countElem = document.getElementById('cat-count');

        // on click, increment the current cat's counter
        this.catImageElem.addEventListener('click', function(){
            octopus.incrementCounter();
        });

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        // update the DOM elements with values from the current cat
        var currentCat = octopus.getCurrentCat();
        this.countElem.textContent = currentCat.clickCount;
        this.catNameElem.textContent = currentCat.name;
        this.catImageElem.src = currentCat.imgSrc;
    }
};

var catListView = {

    init: function() {
        // store the DOM element for easy access later
        this.catListElem = document.getElementById('cat-list');

        // render this view (update the DOM elements with the right values)
        this.render();
    },

    render: function() {
        var cat, elem, i;
        // get the cats we'll be rendering from the octopus
        var cats = octopus.getCats();

        // empty the cat list
        this.catListElem.innerHTML = '';

        // loop over the cats
        for (i = 0; i < cats.length; i++) {
            // this is the cat we're currently looping over
            cat = cats[i];

            // make a new cat list item and set its text
            elem = document.createElement('li');
            elem.textContent = cat.name;

            // on click, setCurrentCat and render the catView
            // (this uses our closure-in-a-loop trick to connect the value
            //  of the cat variable to the click event function)
            elem.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    catView.render();
                };
            })(cat));

            // finally, add the element to the list
            this.catListElem.appendChild(elem);
        }
    }
};

// make it go!
octopus.init();
