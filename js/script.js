//"https://newsapi.org/v2/top-headlines?country=gr&apiKey=3ae61f29fda84c3cbc229339d87d5787"
$(document).ready(() => {
  $.ajax({
    method: "GET",
    url:
      "https://newsapi.org/v2/top-headlines?country=gr&apiKey=3ae61f29fda84c3cbc229339d87d5787",
    success: response => {
      for (article of response.articles) {
        let publishedDate = new Date(article.publishedAt);
        let timePassed = convertMS(
          new Date().getTime() - publishedDate.getTime()
        );
        let image = getImage(article.urlToImage);
        let node =
          "\
              <div class='col-md-4'>\
              <div class='card mb-4 box-shadow'>" +
          image +
          "<div class='card-body'>\
              <h5 class='card-title'>" +
          article.title +
          "</h5>\
              <p class='card-text'>" +
          (article.description !== null
            ? article.description
            : "Περιεχόμενο μη διαθέσιμο") +
          "abc" +
          "</p>\
              <div class='d-flex justify-content-between align-items-center'>\
                      <div class='btn-group'>\
                      <a href='" +
          article.url +
          "' target='_blank'><button type='button' class='btn mr-2 btn-sm btn-outline-secondary'>Επίσκεψη</button></a>\
                      </div>\
                      <small class='text-muted'>" +
          "πριν από " +
          timePassed.hour +
          " ώρες " +
          timePassed.minute +
          " λεπτά</small>\
                      </div>\
                      <div class='mt-4'>\
                      <p><i>Πηγή: " +
          (article.author !== null ? article.author : "Μη διαθέσιμη") +
          "</i></p>\
                      </div>\
                      </div>\
                      </div>";
        $(".row").append(node);
      }
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    }
  });

  function convertMS(milliseconds) {
    var day, hour, minute, seconds;
    seconds = Math.floor(milliseconds / 1000);
    minute = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hour = Math.floor(minute / 60);
    minute = minute % 60;
    day = Math.floor(hour / 24);
    hour = hour % 24;
    return {
      day: day,
      hour: hour,
      minute: minute,
      seconds: seconds
    };
  }
  function getImage(img) {
    let image =
      "<img\
  class='card-img-top'\
  data-src='holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail'\
  alt='Thumbnail [100%x225]'\
  src='img/breakingnews.png'\
  data-holder-rendered='true'\
  style='height: 225px; width: 100%; display: block;'\
/>";
    if (img !== null) {
      image =
        "<img\
  class='card-img-top'\
  data-src='holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail'\
  alt='Thumbnail [100%x225]'\
  src='" +
        img +
        "'\
  data-holder-rendered='true'\
  style='height: 225px; width: 100%; display: block;'\
/>";
    }
    return image;
  }
});
