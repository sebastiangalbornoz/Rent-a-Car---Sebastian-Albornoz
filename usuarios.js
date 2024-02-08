// usuarios.js

function registrarUsuario(usuario, contraseña) {
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioExistente = usuariosRegistrados.find(u => u.usuario === usuario);

    if (!usuarioExistente) {
        usuariosRegistrados.push({ usuario, contraseña });
        localStorage.setItem('usuarios', JSON.stringify(usuariosRegistrados));
        return true; // Registro exitoso
    } else {
        return false; // Usuario ya existente
    }
}

function validarCredenciales(usuario, contraseña) {
    const usuariosRegistrados = JSON.parse(localStorage.getItem('usuarios')) || [];
    return usuariosRegistrados.some(u => u.usuario === usuario && u.contraseña === contraseña);
}
