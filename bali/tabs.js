const strip = document.querySelector('.tab-strip');
const tabs = Array.from(strip.querySelectorAll('a'));
strip.setAttribute('role', 'tablist');
strip.setAttribute('aria-label', '每日行程與旅遊資訊');
function selectTab() {
  const active = tabs.find(tab => tab.hash === location.hash) || tabs[0];
  for (const tab of tabs) {
    const selected = tab === active;
    const panel = document.querySelector(tab.hash);
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;
    panel.hidden = !selected;
  }
  strip.scrollLeft += active.getBoundingClientRect().left - strip.getBoundingClientRect().left - 12;
}
strip.addEventListener('click', event => {
  const tab = event.target.closest('a');
  if (!tab || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  if (location.hash !== tab.hash) history.pushState(null, '', tab.hash);
  selectTab();
});
strip.addEventListener('keydown', event => {
  const index = tabs.indexOf(document.activeElement);
  const next = {ArrowRight:(index+1)%tabs.length, ArrowLeft:(index+tabs.length-1)%tabs.length, Home:0, End:tabs.length-1}[event.key];
  if (next === undefined) return;
  event.preventDefault();
  tabs[next].focus();
  tabs[next].click();
});
window.addEventListener('popstate', selectTab);
window.addEventListener('hashchange', selectTab);
selectTab();
