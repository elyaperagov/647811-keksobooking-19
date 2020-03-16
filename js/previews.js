'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
  var avatarPreview = document.querySelector('.ad-form-header__preview img');
  var formFileChooser = document.querySelector('.ad-form__upload input[type=file]');
  var formPicturePreview = document.querySelector('.ad-form__photo');

  var changePreview = function (image, chooser) {
    var file = chooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        image.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  };

  var addPreview = function () {
    var image = document.createElement('img');
    image.src = '';
    image.width = '70';
    image.height = '70';
    image.alt = 'Фотография жилья';
    formPicturePreview.appendChild(image);
    return image;
  };

  avatarFileChooser.addEventListener('change', function () {
    changePreview(avatarPreview, avatarFileChooser);
  });

  formFileChooser.addEventListener('change', function () {
    changePreview(addPreview(), formFileChooser);
  });

  window.previews = {
    avatarPreview: avatarPreview,
    formPicturePreview: formPicturePreview
  };

})();
