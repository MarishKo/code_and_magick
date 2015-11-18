(function() {
  var formContainer = document.querySelector('.overlay-container');
  var formOpenButton = document.querySelector('.reviews-controls-new');
  var formCloseButton = document.querySelector('.review-form-close');
  var reviewForm = document.forms[1];
  var reviewName = reviewForm.querySelector('#review-name');
  var reviewText = reviewForm.querySelector('#review-text');
  var reviewFields = document.getElementsByClassName('review-fields')[0];
  var reviewNameLabel = reviewForm.querySelector('.review-fields-name');
  var reviewTextLabel = reviewForm.querySelector('.review-fields-text');
  var reviewMark = reviewForm['review-mark'];
  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.remove('invisible');
  };

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    formContainer.classList.add('invisible');
  };

  // Отключение возможности отправить форму без заполненных полей.
  reviewName.required = true;
  reviewText.required = true;
  //функция проверки все ли значения введены
  function CheckValue () {
    if (reviewName.value !=='') {
      reviewNameLabel.classList.add('invisible');
    } else {
      reviewNameLabel.classList.remove('invisible');
    }

    if (reviewText.value !=='') {
      reviewTextLabel.classList.add('invisible');
    } else {
      reviewTextLabel.classList.remove('invisible');
    }

    if (reviewText.value !=='' && reviewName.value !=='') {
      reviewFields.classList.add('invisible');
    } else {
      reviewFields.classList.remove('invisible');
    }

  }

  reviewName.onchange = function () {
    CheckValue();
  }
  reviewText.onchange = function () {
    CheckValue();
  }
  reviewForm.onsubmit = function(evt) {
    evt.preventDefault();
    // Запись оценки в cookies перед отправкой формы
    var dateDiff = new Date() - new Date('Thu, 05 Jan 1991 14:25:00 GMT');
    var expDate = new Date();

    expDate.setTime(Date.now() + dateDiff);
    docCookies.setItem('review-mark', reviewMark.value, expDate);
    reviewForm.submit();
  };

  // Восстанавление сохраненной оценки из cookies
  if (docCookies.hasItem('review-mark')) {
    reviewMark.value = docCookies.getItem('review-mark');
  }

  CheckValue();

})();
