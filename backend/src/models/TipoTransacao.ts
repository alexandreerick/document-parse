import Sequelize, { Model } from 'sequelize';
import { connection as sequelize } from '../database';

interface ITipoTransacao {
  seq_tipo_transacao: number;
  nom_tipo_transacao: string;
  nom_natureza_transacao: string;
  sinal_transacao: string;
}

interface ITipoTransacaoCreate {
  nom_tipo_transacao: string;
  nom_natureza_transacao: string;
  sinal_transacao: string;
}

const TipoTransacao = sequelize.define('tipo_transacao', {
  seq_tipo_transacao: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nom_tipo_transacao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  nom_natureza_transacao: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sinal_transacao: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  schema: 'public',
  tableName: 'tipo_transacao',
  timestamps: false
});

export default TipoTransacao as Sequelize.ModelStatic<Sequelize.Model<ITipoTransacao,ITipoTransacaoCreate>>;