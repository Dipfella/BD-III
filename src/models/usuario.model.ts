import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcryptjs';

export interface IUsuario extends Document {
    userName: string;
    email: string;
    password: string;
    encrypPassword(password: string): Promise<string>;
    validatePassword(password: string): Promise<boolean>;
};

const SchemaUsuario = new Schema({
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});

SchemaUsuario.methods.encrypPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

SchemaUsuario.methods.validatePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.get('password'));
};


export default model<IUsuario>('usuarioModel', SchemaUsuario)