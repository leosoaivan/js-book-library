document.addEventListener('DOMContentLoaded', function() {
  let bookForm = document.querySelector('#add-book-form');
  let elems = document.querySelectorAll('.modal');
  let options = {
    onCloseEnd: function() {
      bookForm.reset();
    },
  };

  M.Modal.init(elems[0], options);

  // bookFormModal.modal({
  //   complete: function() {
  //     bookForm.reset();
  //   },
  // });

  // bookFormModal.options.onCloseEnd = resetForm();
  // console.log(bookFormModal.options);

  // function resetForm() {
  //   bookForm.reset();
});
