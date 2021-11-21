$(document).ready(() => {

  $.get('http://127.0.0.1:8083/categories/countHotNews', data => {
    $('.count').text(data[0].hot_news);
  });

  $.get('http://127.0.0.1:8083/categories', data => {
    const categories = data.map(value => {
      return `
        <li>
          <p data-categoryId='${value.id}'>
            ${value.title} (${value.newscount})
          </p>
        </li>
      `
    });

    $('.categories ul').html(categories);
  });

  $('.categories ul').click(e => {
    if(e.target.tagName == "P"){
      const id = e.target.dataset.categoryid;
      $.get('http://127.0.0.1:8083/categories/' + id + '/news', data => {
        const news = data.map(value => {
          return `
            <li>
              <p data-newsId='${value.id}'>
                ${value.title}
              </p>
            </li>
          `
        });

        $('.list-of-news ul').html(news);
      });
    }
  });

  $('.list-of-news ul').click(e => {

    if(e.target.tagName === "P"){
      const id = e.target.dataset.newsid;

      $.get('http://127.0.0.1:8083/categories/news/' + id, data => {
        $('.content p').text(data.text)
      });
    }
  });

});
