import { Router } from 'express';
import TipoTransacao from './models/TipoTransacao';
import Transacao from './models/Transacao';

const router = Router();

router.get("/tipos-transacoes", async (req, res) => {
  const tiposTransacoes = await TipoTransacao.findAll();

  return res.json(tiposTransacoes);
});

router.get("/transacoes", async (req, res) => {
  const transacoes = await Transacao.findAll();

  return res.json(transacoes);
});

export { router };
