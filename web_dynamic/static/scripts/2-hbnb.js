const amenities = {};

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
