window.onload = () => {
  const printButton = document.getElementById('print-as-pdf');

  // Print button
  printButton.addEventListener('click', e => {
    window.print();
  }, false);

  // @TODO: make it editable only for myself via special command from the console
  // const elements = document.querySelector('.doc');
  // const editor = new MediumEditor(elements);
}
