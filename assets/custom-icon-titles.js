// Fonction pour transformer les spans en h3
function transformIconTitles() {
  const iconTitles = document.querySelectorAll('.kaching-icon-block--icon-title');
  
  if (iconTitles.length > 0) {
    iconTitles.forEach(function(span) {
      // Vérifier si ce n'est pas déjà un h3
      if (span.tagName.toLowerCase() === 'span') {
        const h3 = document.createElement('h3');
        h3.className = span.className;
        h3.setAttribute('style', span.getAttribute('style'));
        h3.innerHTML = span.innerHTML;
        span.parentNode.replaceChild(h3, span);
      }
    });
    console.log('Titres transformés en H3');
  }
}

// Essayer plusieurs fois car l'app charge de manière asynchrone
document.addEventListener('DOMContentLoaded', function() {
  // Essayer immédiatement
  transformIconTitles();
  
  // Essayer après 500ms
  setTimeout(transformIconTitles, 500);
  
  // Essayer après 1s
  setTimeout(transformIconTitles, 1000);
  
  // Essayer après 2s
  setTimeout(transformIconTitles, 2000);
});

// Observer les changements dans le DOM
const observer = new MutationObserver(function(mutations) {
  transformIconTitles();
});

// Démarrer l'observation
observer.observe(document.body, {
  childList: true,
  subtree: true
});
