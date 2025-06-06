function pegarLocalizacao() {
    const telefone = document.getElementById('telefone').value;

    if (!telefone) {
        alert("Por favor, insira seu número de telefone.");
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            fetch('/previsao', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    telefone: telefone
                })
            }).then(response => response.text()).then(html => {
                document.open();
                document.write(html);
                document.close();
            });
        }, function(error) {
            alert("Erro ao obter localização: " + error.message);
        });
    } else {
        alert("Geolocalização não suportada pelo navegador.");
    }
}

function simularEnchente() {
    const telefone = document.getElementById('telefone').value;

    if (!telefone) {
        alert("Por favor, insira seu número de telefone.");
        return;
    }

    fetch('/simular', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            telefone: telefone
        })
    }).then(response => response.text()).then(html => {
        document.open();
        document.write(html);
        document.close();
    });
}
