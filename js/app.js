function generateNumber(len) {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
    nums.sort(function(){return Math.random() - 0.2});
    return nums.slice(0, len);
}

function hasDuplicates(array) {
    var t = array.concat().sort();
    for (var i = 1; i < t.length; i++) {
        if (t[i] == t[i-1])
        return true;
    }
    return false;
}


function game(num, guess) {
    var count = {fijas:0, picas:0};
    var g = guess.join('');
    for (var i = 0; i < num.length; i++) {
        var present = g.search(num[i]) != -1;
        if (num[i] == guess[i]) count.fijas++;
        else if (present) count.picas++;
    }
    return count;
}

$(document).ready(function(){
  num = generateNumber(4);
  console.log(num.join(""));
  $(".button").on("click", function(e){
      $("tbody").empty();
      num = generateNumber(4);
      console.log(num.join(""));
  })

  $('#gamer').keypress(function(e){
      if (e.which == 13) {
          var guess = Array.from($(this).val());
          $(this).val("");
          var arrayOfNumbers = guess.map(Number);
          var result = game(num, arrayOfNumbers);

          if ((!(guess.length == 4)) || hasDuplicates(arrayOfNumbers) || isNaN(arrayOfNumbers.join("")) == true) {

            $('.enun').addClass(function(){
              $(this).css('color', 'red');
            });

          }
          else {
            if (result.fijas != 4){
              $(".table").removeClass("hidden");

              $('.enun').addClass(function(){
                $(this).css('color', 'black');
              });;

              $("tbody").append("<tr><td>"+arrayOfNumbers.join("")+"</td><td>"+result.picas+"</td><td>"+result.fijas+"</td></tr>");
            }
          else {
              $('#modal').modal({
                  show: true
              });
            }
          }
      }
  })
});
