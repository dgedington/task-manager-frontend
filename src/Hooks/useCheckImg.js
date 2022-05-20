function usecheckImage(url) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
      if (request.status == 200) //if(statusText == OK)
      {
        return 'image exists'
      } else {
        return "image doesn't exist";
      }
    }
  }

  export default usecheckImage;