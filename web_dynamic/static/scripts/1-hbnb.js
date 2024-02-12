const amenities = {};

function updateAmenities () {
  $('.amenities h4').text(
    Object.values(amenities).join(', ')
  );
}

$(document).ready(function () {
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
});
