(function(){
// gallery toggle
var toggleButtons = document.querySelectorAll('.toggle-btn');
var groups = document.querySelectorAll('.slider-group');
toggleButtons.forEach(function(btn){
btn.addEventListener('click', function(){
toggleButtons.forEach(function(b){ b.classList.remove('active'); b.setAttribute('aria-selected','false'); });
btn.classList.add('active');
btn.setAttribute('aria-selected','true');
var target = btn.getAttribute('data-target');
groups.forEach(function(g){
g.hidden = g.getAttribute('data-group') !== target;
});
});
});

// sliders
document.querySelectorAll('.slider-group').forEach(function(group){
var track = group.querySelector('.slider-track');
var slides = group.querySelectorAll('.slide');
var dotsWrap = group.querySelector('.slider-dots');
var arrows = group.querySelectorAll('.slider-arrow');
var index = 0;

slides.forEach(function(_, i){
  var dot = document.createElement('button');
  dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', 'Фото ' + (i + 1));
  dot.addEventListener('click', function(){ go(i); });
  dotsWrap.appendChild(dot);
});

function go(i){
  index = (i + slides.length) % slides.length;
  track.style.transform = 'translateX(-' + (index * 100) + '%)';
  dotsWrap.querySelectorAll('.slider-dot').forEach(function(d, di){
    d.classList.toggle('active', di === index);
  });
}

arrows.forEach(function(arrow){
  arrow.addEventListener('click', function(){
    go(index + parseInt(arrow.getAttribute('data-dir'), 10));
  });
});


});

// mobile nav
var menuToggle = document.getElementById('menuToggle');
var mobileNav = document.getElementById('mobileNav');
menuToggle.addEventListener('click', function(){
var open = mobileNav.classList.toggle('open');
menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
mobileNav.querySelectorAll('a').forEach(function(a){
a.addEventListener('click', function(){
mobileNav.classList.remove('open');
menuToggle.setAttribute('aria-expanded', 'false');
});
});
})();

// (function(){
//   // 1. Таби (Галерея)
//   var toggleButtons = document.querySelectorAll('.toggle-btn');
//   var groups = document.querySelectorAll('.slider-group');
//
//   toggleButtons.forEach(function(btn){
//     btn.addEventListener('click', function(){
//       toggleButtons.forEach(function(b){
//         b.classList.remove('active');
//         b.setAttribute('aria-selected','false');
//       });
//       btn.classList.add('active');
//       btn.setAttribute('aria-selected','true');
//
//       var target = btn.getAttribute('data-target');
//       groups.forEach(function(g){
//         var isTarget = g.getAttribute('data-group') === target;
//         g.hidden = !isTarget;
//         if (isTarget && g.updateSlider) {
//           g.updateSlider();
//         }
//       });
//     });
//   });
//
//   // 2. Безперервні слайдери з підтримкою клонування
// // sliders
// document.querySelectorAll('.slider-group').forEach(function(group){
//   var track = group.querySelector('.slider-track');
//   var originalSlides = group.querySelectorAll('.slide');
//   var dotsWrap = group.querySelector('.slider-dots');
//   var arrows = group.querySelectorAll('.slider-arrow');
//
//   if (!dotsWrap || !track || originalSlides.length === 0) return;
//
//   // Видаляємо старі клони, якщо вони були
//   group.querySelectorAll('.slide.clone').forEach(function(c){ c.remove(); });
//
//   // Клонуємо елементи
//   var firstClone = originalSlides[0].cloneNode(true);
//   var lastClone = originalSlides[originalSlides.length - 1].cloneNode(true);
//
//   firstClone.classList.add('clone');
//   lastClone.classList.add('clone');
//
//   track.appendChild(firstClone);
//   track.insertBefore(lastClone, originalSlides[0]);
//
//   var allSlides = group.querySelectorAll('.slide');
//   var currentIndex = 1;
//   var isAnimating = false;
//
//   dotsWrap.innerHTML = '';
//   originalSlides.forEach(function(_, i){
//     var dot = document.createElement('button');
//     dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
//     dot.setAttribute('aria-label', 'Фото ' + (i + 1));
//     dot.addEventListener('click', function(){
//       if (!isAnimating) go(i + 1, true);
//     });
//     dotsWrap.appendChild(dot);
//   });
//
//   function setPosition(animate) {
//     if (animate) {
//       track.style.transition = 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)';
//     } else {
//       track.style.transition = 'none';
//     }
//
//     var slideWidthPercent = (allSlides[0].offsetWidth / track.parentElement.offsetWidth) * 100;
//     var centerOffsetPercent = (100 - slideWidthPercent) / 2;
//     var movePercent = (currentIndex * slideWidthPercent) - centerOffsetPercent;
//
//     track.style.transform = 'translateX(-' + movePercent + '%)';
//
//     allSlides.forEach(function(s, si){
//       s.classList.toggle('active-slide', si === currentIndex);
//     });
//
//     var realIndex = (currentIndex - 1 + originalSlides.length) % originalSlides.length;
//     dotsWrap.querySelectorAll('.slider-dot').forEach(function(d, di){
//       d.classList.toggle('active', di === realIndex);
//     });
//   }
//
//   function go(targetIndex, animate) {
//     if (isAnimating) return;
//     isAnimating = true;
//     currentIndex = targetIndex;
//     setPosition(animate);
//   }
//
//   track.addEventListener('transitionend', function(e){
//     // Спрацьовує тільки при анімації transform
//     if (e.propertyName !== 'transform') return;
//
//     isAnimating = false;
//
//     // Стрибок з клону на реальний перший слайд
//     if (currentIndex === allSlides.length - 1) {
//       currentIndex = 1;
//       setPosition(false);
//     }
//
//     // Стрибок з клону на реальний останній слайд
//     if (currentIndex === 0) {
//       currentIndex = allSlides.length - 2;
//       setPosition(false);
//     }
//   });
//
//   arrows.forEach(function(arrow){
//     arrow.addEventListener('click', function(){
//       if (isAnimating) return;
//       var dir = parseInt(arrow.getAttribute('data-dir'), 10);
//       go(currentIndex + dir, true);
//     });
//   });
//
//   group.updateSlider = function() { setPosition(false); };
//
//   // Встановлюємо початкове положення після повного завантаження сторінки
//   requestAnimationFrame(function(){
//     setPosition(false);
//   });
// });
//
//   // 3. Мобільне меню
//   var menuToggle = document.getElementById('menuToggle');
//   var mobileNav = document.getElementById('mobileNav');
//   if (menuToggle && mobileNav) {
//     menuToggle.addEventListener('click', function(){
//       var open = mobileNav.classList.toggle('open');
//       menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
//     });
//     mobileNav.querySelectorAll('a').forEach(function(a){
//       a.addEventListener('click', function(){
//         mobileNav.classList.remove('open');
//         menuToggle.setAttribute('aria-expanded', 'false');
//       });
//     });
//   }
// })();