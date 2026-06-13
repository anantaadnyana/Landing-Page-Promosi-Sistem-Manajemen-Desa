const container = document.querySelector('.artikel-container');
document.querySelector('.next').onclick = () => {
  container.scrollBy({ left: 400, behavior: 'smooth' });
};
document.querySelector('.prev').onclick = () => {
  container.scrollBy({ left: -400, behavior: 'smooth' });
};


