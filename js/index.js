document.addEventListener("DOMContentLoaded", function(event) {
    document.getElementById('monday').textContent = nearestMonday();

    var items = document.querySelectorAll('.carousel .item');
    var dots = document.querySelectorAll('.carousel-indicators li');
    var currentItem = 0;
    var isEnabled = true;

    function changeCurrentItem(n) {
        currentItem = (n + items.length) % items.length;
    }

    function nextItem(n) {
        hideItem('to-left');
        changeCurrentItem(n + 1);
        showItem('from-right');
    }

    function previousItem(n) {
        hideItem('to-right');
        changeCurrentItem(n - 1);
        showItem('from-left');
    }

    function goToItem(n) {
        if (n < currentItem) {
            hideItem('to-right');
            currentItem = n;
            showItem('from-left');
        } else {
            hideItem('to-left');
            currentItem = n;
            showItem('from-right');
        }
    }

    function hideItem(direction) {
        isEnabled = false;
        items[currentItem].classList.add(direction);
        dots[currentItem].classList.remove('active');
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('active', direction);
        });
    }

    function showItem(direction) {
        items[currentItem].classList.add('next', direction);
        dots[currentItem].classList.add('active');
        items[currentItem].addEventListener('animationend', function() {
            this.classList.remove('next', direction);
            this.classList.add('active');
            isEnabled = true;
        });
    }

    document.querySelector('.carousel-control.left').addEventListener('click', function() {
        if (isEnabled) {
            previousItem(currentItem);
        }
    });

    document.querySelector('.carousel-control.right').addEventListener('click', function() {
        if (isEnabled) {
            nextItem(currentItem);
        }
    });

    document.querySelector('.carousel-indicators').addEventListener('click', function(e) {
        var target = [].slice.call(e.target.parentNode.children).indexOf(e.target);
        if (target !== currentItem && target < dots.length) {
            goToItem(target);
        }
    });


    (function() {

        var hamburger = {
            navToggle: document.querySelector('.nav-toggle'),
            nav: document.querySelector('nav'),

            doToggle: function(e) {
                e.preventDefault();
                this.navToggle.classList.toggle('expanded');
                this.nav.classList.toggle('expanded');
            }
        };

        hamburger.navToggle.addEventListener('click', function(e) { hamburger.doToggle(e); });
        hamburger.nav.addEventListener('click', function(e) { hamburger.doToggle(e); });

    }());


});

function formatDate(date) {

    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
}

function nearestMonday() {
    date = new Date();
    m = new Date();

    if(date.getDay()) {
        m.setDate(date.getDate() + 8 - date.getDay())
    } else {
        m.setDate(date.getDate() + 1)
    }

    return formatDate(m);
}
