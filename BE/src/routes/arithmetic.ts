import express from 'express';
import Calc from '../models/calc'; // Assuming this is your model for saving calculations

const router = express.Router();

interface CalculationRequest {
  lhs: number;
  rhs: number;
  memo?: string;
}

async function performCalculation(lhs: number, rhs: number, op: string): Promise<number> {
  switch (op) {
    case 'add':
      return lhs + rhs;
    case 'sub':
      return lhs - rhs;
    case 'mul':
      return lhs * rhs;
    case 'div':
      if (rhs === 0) throw new Error('Division by zero');
      return lhs / rhs;
    default:
      throw new Error('Invalid operation');
  }
}

async function saveCalculation(lhs: number, rhs: number, op: string, result: number, memo?: string) {
  try {
    const savedCalc = await Calc.create({ lhs, op, rhs, result, memo });
    return savedCalc;
  } catch (error) {
    console.error('Error saving calculation:', error);
    throw new Error('Failed to save calculation');
  }
}

router.post('/:operation', async (req, res) => {
  try {
    const { lhs, rhs, memo } = req.body as CalculationRequest;
    const operation = req.params.operation;

    if (typeof lhs !== 'number' || typeof rhs !== 'number') {
      return res.status(400).json({ error: 'Invalid input. lhs and rhs must be numbers.' });
    }

    if (!['add', 'sub', 'mul', 'div'].includes(operation)) {
      return res.status(400).json({ error: 'Invalid operation. Must be add, sub, mul, or div.' });
    }

    const result = await performCalculation(lhs, rhs, operation);
    const savedCalc = await saveCalculation(lhs, rhs, operation, result, memo);

    res.json({
      id: savedCalc.id,
      lhs,
      op: operation,
      rhs,
      result,
      memo: savedCalc.memo,
    });
  } catch (error) {
    console.error('Error in calculation route:', error);
    
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unexpected error occurred' });
    }
  }
});

export default router;