const User = requite('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//1. Registro de usuario (Rol 'customer' por defecto)
exports.register = async (req, res) => {
    try{
        const { name, email, password, phone, address } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.'});
        }

        // Encriptar la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear el usuario con rol 'customer' (por defecto desde el Modelo)
        const newUser = new User({
            name,
            email,
            password: hashedPaseword,
            phone,
            address,
            role: 'customer' // Asignación explícita de seguridad
        });

        await newUser.save();

        res.status(201).json({
            message: 'Usuario registrado con éxito',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor al registrar el usuario', error: error.message });
    }
};

// 2. Inicio de sesión
exports.login = async (req, res) => {
    try{
        const { email, password } = req.body;

        //Buscar al usuario
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        // Validar contraseña
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas.' });
        }

        // Generar token JWT con id y rol
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || 'secreto_kera',
            { expiresIn: '1d' }
        );

        //Responder con token y datos clave del user
        res.json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor al iniciar sesión', error: error.message });
    }
};