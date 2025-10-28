(function(){
  const inc = document.getElementById('inc-btn')
  const dec = document.getElementById('dec-btn')
  const reset = document.getElementById('reset-btn')
  const toggle = document.getElementById('toggle-btn')
  const countEl = document.getElementById('count')
  const para = document.getElementById('toggle-paragraph')

  let count = parseInt(countEl.textContent || '0', 10) || 0

  function render(){
    countEl.textContent = count
  }

  inc.addEventListener('click', ()=>{ count += 1; render() })
  dec.addEventListener('click', ()=>{ count = Math.max(0, count - 1); render() })
  reset.addEventListener('click', ()=>{ count = 0; render() })
  toggle.addEventListener('click', ()=>{ para.style.display = (para.style.display === 'none') ? '' : 'none' })

  // initial render
  render()
})();
