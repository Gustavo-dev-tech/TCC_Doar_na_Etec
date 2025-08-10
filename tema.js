window.addEventListener('load', () => {
  if (localStorage.getItem('tema') === 'escuro') {
    search = document.getElementsByClassName('search-bar');
    search[0].style.backgroundColor = '#333'; // Muda a cor de fundo da barra de pesquisa
    document.body.classList.add('dark-mode');
    
  } else {
    document.body.classList.remove('dark-mode');
  }
})
function aplicarTemaMapa(tema) {
  if (tema === 'escuro') {
    map.setPaintProperty('water', 'fill-color', '#0B3D91');      // Azul escuro água
    map.setPaintProperty('land', 'background-color', '#1e1e1e');  // Fundo terra escuro
    map.setPaintProperty('road', 'background-color', '#2e5d2e');  // Estrada verde escuro
    
    //Mapa
    doar =document.getElementsByClassName('ICONE') // configurações
    textIcons = document.getElementsByClassName('text') // texto dos ícones
    painel = document.getElementsByClassName('navigation') // painel de navegação
    painel[0].style.backgroundColor = '#1e1e1e';
    for (let i = 0; i < 5; i++) {
        doar[i].style.color = '#ffffff'; // Muda a cor do texto para branco 
        textIcons[i].style.color = '#ffffff'; // Muda a cor do texto para branco
    }

  } else {
    map.setPaintProperty('water', 'fill-color', '#1491F7');      // Azul claro água
    map.setPaintProperty('land', 'background-color', '');         // Cor padrão
    map.setPaintProperty('road', 'background-color', '#3e8e41');  // Estrada verde claro
  }
}
