import { Router } from 'express';
import multer from 'multer';
import { Readable } from 'stream';
import readline from 'readline';
import { connection as sequelizeConnection } from './database';

import TipoTransacao from './models/TipoTransacao';
import Transacao from './models/Transacao';

const multerConfig = multer();

const router = Router();

router.post("/transactions", multerConfig.single("file"), async (req, res) => {
  try {
    const { file } = req;

    if (!file) return res.status(400).json({ failed: true, message: 'You need to input the file.' })

    const { buffer } = file;

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const fileLine = readline.createInterface({
      input: readableFile
    });

    const transactionsToInsert = [];
    
    for await (const line of fileLine) {
      const [firstPart, secondPart] = line.split('  ').filter(Boolean);

      if (!firstPart || !secondPart) continue;

      const cod_tipo_transacao = Number(firstPart.slice(0, 1));
      const dth_transacao = firstPart.slice(1, 26);
      const nom_produto = firstPart.slice(26, 56);
      const num_valor = Number(secondPart.slice(0, 10).replace(' ', '').padEnd(10, '0'));
      const nom_vendedor = secondPart.slice(10).replace(/[\d]/, '');

      const objToInsert = {
        cod_tipo_transacao,
        dth_transacao,
        nom_produto,
        num_valor,
        nom_vendedor
      }

      transactionsToInsert.push(objToInsert);
    }

    const transactionInserted = await Transacao.bulkCreate(transactionsToInsert);

    return res.json(transactionInserted);
  } catch (error) {
    return res.json(error);
  }
});

router.get("/type-transactions", async (req, res) => {
  const tiposTransacoes = await TipoTransacao.findAll();

  return res.json(tiposTransacoes);
});

router.get("/transactions", async (req, res) => {
  const query = `
    SELECT 
      t.*,
      tt.nom_tipo_transacao
    FROM transacao t
    INNER JOIN tipo_transacao tt ON tt.seq_tipo_transacao = t.cod_tipo_transacao
  `

  const transacoes = await sequelizeConnection.query(query);

  return res.json(transacoes[0] || []);
});

export { router };
