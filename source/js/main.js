'use strict';
(function () {
  var body = document.querySelector('body');
  var contactsButton = document.querySelector('.page-header__contacts-btn');
  var modal = document.querySelector('.modal');
  var buttonClose = document.querySelector('.modal__close-btn');
  var buttonSend = document.querySelector('.modal__btn');
  var overlay = document.querySelector('.overlay');
  var nameField = document.querySelector('.modal [type="text"]');
  var phoneField = document.querySelector('.modal [type="tel"]');
  var nameModal = document.querySelector('#name-modal');
  var phoneModal = document.querySelector('#phone-modal');
  var messageModal = document.querySelector('#message-modal');
  var navFooter = document.querySelector('.nav__list');
  var contactList = document.querySelector('.page-footer__contacts-list');
  var btnNav = document.querySelector('#btn-nav');
  var btnContact = document.querySelector('#btn-contact');
  var esc = 27;
  var customersInfo = document.querySelector('[class="about__customers about__customers"]');


  var maxTextSize = customersInfo.innerText;
  var minTextSize = customersInfo.innerText.slice(0, -129) + '...';

  window.addEventListener('resize', function () {
    if (window.innerWidth < 768) {
      customersInfo.innerText = minTextSize;
    } else {
      customersInfo.innerText = maxTextSize;
    }
  });

  // popup
  modal.addEventListener('click', function (e) {
    if (
      e.target.className === buttonClose.className ||
      e.target.className === buttonSend.className
    ) {
      return;
    }
    e.stopPropagation();
  });

  contactsButton.addEventListener('click', function (evt) {
    evt.preventDefault();

    modal.classList.remove('modal--close');
    overlay.classList.remove('overlay--close');
    body.style.overflow = 'hidden';
    nameField.focus();
  });

  var closeModal = function closeModal() {
    modal.classList.add('modal--close');
    overlay.classList.add('overlay--close');
    body.style.overflow = 'auto';
  };

  buttonClose.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);
  window.addEventListener('keydown', function (e) {
    if (e.keyCode === esc) {
      closeModal();
    }
  });

  // localstorage
  if (modal) {
    modal.addEventListener('submit', function () {
      localStorage.setItem('name-modal', nameModal.value);
      localStorage.setItem('phone-modal', phoneModal.value);
      localStorage.setItem('message-modal', messageModal.value);
    });
  }

  // mask phone
  function normalizerPhone(phone, mask) {
    phone.match(/\d/gi).forEach(function (e) {
      mask = mask.replace('*', e);
    });

    return mask.replace(/\*(.?)+/, '').replace(/\D$/, '');
  }

  phoneField.addEventListener('focus', function () {
    if (phoneField.value === '') {
      phoneField.value = '+7(';
    }
  });

  phoneField.addEventListener('input', function (e) {
    phoneField.value = normalizerPhone(e.target.value, '+*(***)***-**-**');
  });

  // accordion
  var toggle = function toogle(e, btn, changeClass) {
    e.preventDefault();

    if (btn.classList.contains('page-footer__toggle--plus')) {
      btn.classList.remove('page-footer__toggle--plus');
      btn.classList.add('page-footer__toggle--minus');
      changeClass.style.display = 'block';
    } else {
      btn.classList.remove('page-footer__toggle--minus');
      btn.classList.add('page-footer__toggle--plus');
      changeClass.style.display = 'none';
    }
  };

  btnNav.addEventListener('click', function (e) {
    return toggle(e, btnNav, navFooter);
  });
  btnContact.addEventListener('click', function (e) {
    return toggle(e, btnContact, contactList);
  });
})();
