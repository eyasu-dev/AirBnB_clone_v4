const amenities = {};

function pluralize (number, baseWord) {
  let result;

  if (number == 1) {
    result = `1 ${baseWord}`;
  } else {
    result = `${number} ${baseWord}s`;
  }

  return result;
}

function formatPlace (place) {
  const place_obj = $('<article></article>');

  const title = $('<div class="title_box"></div>');
  title.append($('<h2></h2>').text(place.name));
  title.append($('<div class="price_by_night"></div>').text(`\$${place.price_by_night}`));

  const information = $('<div class="information"></div>');
  information.append(
    $('<div class="max_guest"></div>').text(pluralize(place.max_guest, "Guest"))
  );
  information.append(
    $('<div class="number_rooms"></div>')
      .text(pluralize(place.number_rooms, "Bedroom"))
  );
  information.append(
    $('<div class="number_bathrooms"></div>')
      .text(pluralize(place.number_bathrooms, "Bathroom"))
  );

  const user_info = $(`<div id="${place.id}" class="user"></div>`);
  user_info.append($('<b>Owner:</b>'));
  $.get(`http://0.0.0.0:5001/api/v1/users/${place.user_id}/`)
   .done(function (user) {
     $(`#${place.id}`).append(` ${user.first_name} ${user.last_name}`);
   });

  const description = $('<div class="description"></div>').text(place.description);

  place_obj.append(title);
  place_obj.append(information);
  place_obj.append(user_info);
  place_obj.append(description);

  return place_obj.html();
}

function addSearchButtonListener () {
  $('button').click(function () {
    $.ajax({
      method: 'POST',
      dataType: 'JSON',
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      data: JSON.stringify({}),
      headers: {
        'Content-Type': 'application/json'
      },
      success: function (response) {
        $('.places').html(response.map(formatPlace).join('\n'));
      }
    });
  });
}

function updateAmenities () {
  $('.amenities h4').text(
    Object.values(amenities).join(', ')
  );
}

function addAmenityCheckboxListener () {
  $('.amenity').each(
    function (idx, amenity) {
      $(amenity).change(function (event) {
        const obj = event.target;
        if (obj.checked) {
          amenities[obj.getAttribute('data-id')] = obj.getAttribute('data-name');
        } else {
          delete amenities[obj.getAttribute('data-id')];
        }
        updateAmenities();
      });
    }
  );
}

function checkApiStatus () {
  $.get('http://0.0.0.0:5001/api/v1/status/', function (response) {
    if (response.status === 'OK') {
      $('#api_status').addClass('available');
    }
  });
}

$(document).ready(addAmenityCheckboxListener);
$(document).ready(checkApiStatus);
$(document).ready(addSearchButtonListener);
