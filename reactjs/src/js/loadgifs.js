export function loadOn(src, parent){
   const img = document.createElement('img');
   const figure = document.createElement('figure');

   figure.className = 'loadgif';
   img.src = src;

   figure.appendChild(img);

   parent.appendChild(figure);
   return figure;
}

export function loadOff(element){
   element.remove();
}