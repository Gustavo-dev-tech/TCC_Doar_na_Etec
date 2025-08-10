
mapboxgl.accessToken = 'pk.eyJ1IjoiZ3V1aDIiLCJhIjoiY20xdnF0ZzYwMGRidzJrcTE4YTlxcjRuOSJ9.BQM_h_jGoH5S8XyN1EDwRw' 
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-47.25084381796481, -22.814462832270603 ], 
            zoom: 10
        })
        map.on('load', () => {
            map.setPaintProperty('water', 'fill-color', '#1491F7') // Cor azul para água
            map.setPaintProperty('land', 'background-color', '') 
            map.setPaintProperty('road', 'background-color', '#3e8e41') // 
        })
        
        // Dados das ETECs
const etecs = [
    { name: "ETEC Polivalente de Americana", latitude: -22.735105637462283, longitude: -47.31459478727817, file: "etec_polivalente_de_americana.html", horario: "Seg-Sex: 8h às 22h", telefone: "+5519998765432"},
    { name: "ETEC João Belarmino", latitude: -22.705617351907293, longitude: -46.76495686931041, file: "etec_joão_belarmino.html", horario: "Seg-Sex: 8h às 22h", telefone: "+5519998765432"},
    { name: "ETEC Bento Quirino", latitude: -22.88793299688249, longitude: -47.046732462142984, file: "etec_bento_quirino.html", horario: "Seg-Sex: 8h às 22h", telefone: "+5519998765432"},
    { name: "ETEC Hortolândia", latitude: -22.872140239665345, longitude: -47.2101139378577, file: "etec_hortolandia.html", horario: "Seg-Sex: 8h às 22h", telefone: "+5519998765432"},
    { name: "ETEC Paulínia", latitude: -22.79573680780621, longitude: -47.11907567007766, file: "etec_paulinia.html", horario: "Seg-Sex: 8h às 22h", telefone: "+5519998765432"},
    { name: "ETEC Sumaré", latitude: -22.814462832270603, longitude: -47.25084381796481, file: "etec_sumare.html", horario: "Seg-Sex: 8h às 22h", telefone: "+5519998765432"}

]

// Adiciona marcadores ao mapa
etecs.forEach(etec => {
    new mapboxgl.Marker()
        .setLngLat([etec.longitude, etec.latitude])
        .setPopup(new mapboxgl.Popup().setHTML(`<a href="${etec.file}" target="_blank">${etec.name}</a>`))
        .addTo(map)
})




  const input = document.getElementById('search-input');
  const list = document.getElementById('autocomplete-list');
 

function mostrarLista(filtrados) {
    //list.innerHTML = ''; // Limpa a lista antes de mostrar os resultados

  if (filtrados.length === 0) {
    const noResult = document.createElement('div');
    noResult.textContent = 'Nenhuma ETEC encontrada';
    noResult.style.padding = '14px';
    list.appendChild(noResult);
    return;
  }

  filtrados.forEach(etec => {
    const item = document.createElement('div');
    item.textContent = etec.name;
    item.style.padding = '10px';
    item.style.cursor = 'pointer';

    item.addEventListener('click', () => {
      input.value = etec.name;
      list.innerHTML = ''; // limpa lista ao selecionar

      // adicionar código para centralizar o mapa etc.
      map.flyTo({
        center: [etec.longitude, etec.latitude],
        zoom: 14,
        essential: true
      });

      // Exibir popup no mapa
      new mapboxgl.Popup()
        .setLngLat([etec.longitude, etec.latitude])
        .setHTML(`<strong>${etec.name}</strong>`)
        .addTo(map);
    });

    list.appendChild(item);
  });
}

// Mostrar todas as sugestões ao focar no campo
input.addEventListener('focus', () => {
  mostrarLista(etecs);
});

// Filtrar e mostrar sugestões enquanto digita
input.addEventListener('input', () => {
  const valor = input.value.trim();
  if (valor === '') {
    mostrarLista(etecs);
  } else {
    const filtrados = filtrarEtecs(valor);
    mostrarLista(filtrados);
  }
});










  
    function searchEtec() {
        const list = document.getElementById('autocomplete-list');


        const searchValue = document.getElementById('search-input').value.trim().toLowerCase()

        // Busca pelo nome
        const etecFound = etecs.find(etec => 
            etec.name.toLowerCase().includes(searchValue)
        )
        if (etecFound) {
            // Centraliza o mapa na ETEC encontrada
            map.flyTo({
                center: [etecFound.longitude, etecFound.latitude],
                zoom: 14,
                essential: true
            })
            // Pesquisando nome da Etec
            new mapboxgl.Popup()
                .setLngLat([etecFound.longitude, etecFound.latitude])
                .addTo(map)

            clearSuggestions()
            // Carrega os detalhes da ETEC
            carregarDetalhes(etecFound.file)
            // Exibe o horário e telefone
        } else {
            alert("ETEC não encontrada. Tente novamente.")
        }
    }

    // Exibir sugestões
    function showSuggestions() {
        const input = document.getElementById('search-input').value.trim().toLowerCase()
        const suggestionsBox = document.getElementById('suggestions')
        
        if (input === "") {
            suggestionsBox.style.display = "none"
            return
        }

        const filteredEtecs = etecs.filter(etec =>
            etec.name.toLowerCase().includes(input)
        )

        suggestionsBox.innerHTML = ""
        if (filteredEtecs.length > 0) {
            filteredEtecs.slice(0, 2).forEach(etec => {
                const suggestionItem = document.createElement('div')
                suggestionItem.className = "suggestion-item"
                suggestionItem.textContent = etec.name

                // Ao clicar na sugestão, centraliza no mapa
                suggestionItem.onclick = () => {
                    document.getElementById('search-input').value = etec.name
                    map.flyTo({
                        center: [etec.longitude, etec.latitude],
                        zoom: 14,
                        essential: true
                    })

                    // Exibe o popup
                    new mapboxgl.Popup()
                        .setLngLat([etec.longitude, etec.latitude])
                        .setHTML(`<strong>${etec.name}</strong>`)
                        .addTo(map)

                    clearSuggestions()
                }

                suggestionsBox.appendChild(suggestionItem)
            })
            suggestionsBox.style.display = "block"
        } else {
            suggestionsBox.style.display = "none"
        }
    }

    // Limpar sugestões
    function clearSuggestions() {
        document.getElementById('suggestions').style.display = "none"
    }
    // carregar os detalhes da ETEC diretamente no conteúdo
    function carregarDetalhes(fileName) {
        // Verificar se o arquivo existe
        console.log("Tentando carregar o arquivo: " + fileName)
        fetch(fileName)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Arquivo não encontrado: " + fileName)
                }
                return response.text()
            })
            .then(data => {
                document.getElementById('conteudo').innerHTML = data
            })
            .catch(error => {
                console.error('Erro ao carregar o conteúdo:', error)
                document.getElementById('conteudo').innerHTML = '<p>Não foi possível carregar as informações dessa ETEC. Tente novamente mais tarde.</p>'
            })
    }
    // Captura a localização exata do usuário
        let userLocation = null

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    userLocation = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }

            // Adiciona um marcador para a localização do usuário no mapa
            new mapboxgl.Marker({ color: '#3e8e41' })
                .setLngLat([userLocation.longitude, userLocation.latitude])
                .setPopup(new mapboxgl.Popup().setHTML('<strong>Sua localização</strong>'))
                .addTo(map)

            // Dá zoom no mapa para a localização do usuário
            map.flyTo({
                center: [userLocation.longitude, userLocation.latitude],
                zoom: 14, // Define o nível de zoom (ajustável)
                essential: true // Permite animação suave
            })

            console.log("Localização do usuário:", userLocation)
        },
        error => {
            console.error("Erro ao obter a localização do usuário:", error)
        },
        { enableHighAccuracy: true }
        )
        } else {
            console.warn("Geolocalização não é suportada neste navegador.")
        }