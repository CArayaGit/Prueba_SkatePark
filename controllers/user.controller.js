const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUserDB, createUserDB } = require("../database/db");
const path = require("path");

const getUsers = async (req, res) => {
    const respuesta = await getUserDB();
    if(!respuesta.ok) {
        return res.status(500).json({ OK: false, msg: respuesta.msg });
    }
    return res.json({ ok: true, users: respuesta.users});
};

const createUser = async (req, res) => {
    try{
        const { nombre, email, password } = req.body
        const {foto} = req.files;

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const respuesta = await createUserDB({
            nombre,
            email,
            hashPassword,
            pathFoto: req.pathFoto,
        });

        if(!respuesta.ok) {
            throw new Error(respuesta.msg);
        }

        foto.mv(
            path.join(__dirname, "../public/avatars/", req.pathFoto),
            (err) => {
                if(err) throw new Error('No se puede guardar la imagen');
            }
        );

        const payload = {id: respuesta.id};
        const token = jwt.sign(payload, process.env.JWT_SECRET);

        return res.json({
            ok: true,
            token,
        });
    } catch(error) {
        return res.status(400).json({
            ok: false,
            msg: error.message
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email?.trim() || !password?.trim()) {
            throw new Error("Algunos campos están vacios");
        }

        const respuesta = await getUserDB(email);
        if (!respuesta.ok) {
            throw new Error(respuesta.msg);
        } if (!respuesta.user) {
            throw new Error("No existe el email registrado");
        }

        const { user } = respuesta;
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            throw new Error("Contraseña incorrecta");
        }

        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        return res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            ok: false,
            msg: error.message,
        });
    }
};

module.exports = {
    getUsers,
    createUser,
    loginUser,
};