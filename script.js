// Site interactivity: mobile nav toggle, reveal on scroll, smooth scroll, theme toggle
(function(){
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.getElementById('site-nav');
  const themeToggle = document.getElementById('theme-toggle');

  if(navToggle && siteNav){
    navToggle.addEventListener('click', ()=>{
      const open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open);
    });
  }

  // Smooth scroll for in-page links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', e=>{
      const target = a.getAttribute('href');
      if(target.length>1){
        const el = document.querySelector(target);
        if(el){
          e.preventDefault();
          el.scrollIntoView({behavior:'smooth',block:'start'});
          if(siteNav && siteNav.classList.contains('open')) siteNav.classList.remove('open');
        }
      }
    });
  });

  // Reveal on scroll
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.card, .hero-inner, .lead, .section h2').forEach(el=>{
    el.classList.add('reveal'); obs.observe(el);
  });

  // Theme toggle (light/dark) - simple class on body
  const setTheme = (t)=>{
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('theme', t);
  }
  const current = localStorage.getItem('theme') || 'dark';
  setTheme(current);
  if(themeToggle){
    themeToggle.addEventListener('click', ()=>{
      const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      setTheme(next);
    });
  }
})();
