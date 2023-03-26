import Sequelize from 'sequelize';
import { connection as sequelize } from '../database';

interface ITransacao {
  seq_transacao: number;
  nom_produto: string;
  num_valor: number;
  nom_vendedor: string;
  dth_transacao: string;
  cod_tipo_transacao: number;
}

interface ITransacaoCreate {
  nom_produto: string;
  num_valor: number;
  nom_vendedor: string;
  dth_transacao: string;
  cod_tipo_transacao: number;
}

const Transacao = sequelize.define('transacao', {
  seq_transacao: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nom_produto: {
    type: Sequelize.STRING,
    allowNull: false
  },
  num_valor: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  nom_vendedor: {
    type: Sequelize.STRING,
    allowNull: false
  },
  dth_transacao: {
    type: Sequelize.DATE,
    allowNull: false
  },
  cod_tipo_transacao: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
}, {
  schema: 'public',
  tableName: 'transacao',
  timestamps: false
});

export default Transacao as Sequelize.ModelStatic<Sequelize.Model<ITransacao,ITransacaoCreate>>;