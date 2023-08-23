window.onload = () => {
  const printButton = document.getElementById('print-as-pdf');
  // Print button
  printButton.addEventListener('click', e => {
    window.print();
  }, false);
}
