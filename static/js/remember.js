function storeUser() {
	if (window.localStorage){
		var newUser = username.value;
		
		if (localStorage.getItem("username")) {
			if (newUser != localStorage.getItem("username")){
				var storedUser = localStorage.getItem("username");
				
				if (confirm("Tu nombre de usuario está guardado actualmente como: " +
							storedUser +
							". ¿Estás seguro de que lo quieres cambiar por: " +
							newUser +
							"?")) {
					localStorage.setItem("username", newUser);
				}
			}
		}
		else {
			localStorage.setItem("username", newUser);
		}
	}
	else{
		alert("Tu navegador no soprta almacenamiento local.");
	}
}


function clearLocalStorage() {
	if (window.localStorage){
		if (localStorage.getItem("username")){
			if (confirm("¿Estás seguro de que quieres que dejemos de recordar tu usuario: " +
						localStorage.getItem("username") +
						"?")) {
				window.localStorage.removeItem("username");
				username.value = "";
			}
		}
		else{
			alert("Actualmente no tienes ningún usuario guardado.");
		}
	}
	else{
		alert("Tu navegador no soprta almacenamiento local.");
	}
}
