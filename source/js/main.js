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
  var toggleFooter = document.querySelectorAll('.page-footer__toggle');
  var esc = 27;


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
  toggleFooter[0].addEventListener('touchstart', function () {
    if (navFooter.style.display === 'none') {
      navFooter.style.display = 'block';
      navFooter.classList.remove('menu-closed');
      contactList.style.display = 'none';
      contactList.classList.add('menu-closed');
    } else {
      navFooter.style.display = 'none';
      navFooter.classList.add('menu-closed');
    }
  });

  toggleFooter[1].addEventListener('touchstart', function () {
    if (contactList.style.display === 'none') {
      contactList.style.display = 'block';
      contactList.classList.remove('menu-closed');
      navFooter.style.display = 'none';
      navFooter.classList.add('menu-closed');
    } else {
      contactList.style.display = 'none';
      contactList.classList.add('menu-closed');
    }
  });
})();
