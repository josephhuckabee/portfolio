
  function startScrolling() {
    var scrollingDiv = document.getElementById('scrollingDiv');
    var scrollingText = document.getElementById('scrollingText');

    var scrollAmount = 1;
    var scrollDelay = 30; // in milliseconds

    function scroll() {
      scrollingDiv.scrollTop += scrollAmount;
      if (scrollingDiv.scrollTop >= scrollingText.clientHeight) {
        scrollingDiv.scrollTop = 0;
      }
    }

    var scrollInterval = setInterval(scroll, scrollDelay);

    scrollingDiv.addEventListener('mouseenter', function() {
      clearInterval(scrollInterval);
    });

    scrollingDiv.addEventListener('mouseleave', function() {
      scrollInterval = setInterval(scroll, scrollDelay);
    });
  }

  // Call the function to start scrolling when the page is loaded
  document.addEventListener('DOMContentLoaded', startScrolling);
