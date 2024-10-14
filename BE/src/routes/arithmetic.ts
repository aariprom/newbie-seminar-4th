import express from "express";
import z from "zod";
import CalcDB from "../db/calc";

const router = express.Router();
const url = '/arithmetics';

const arithSchema = z.object({
    lhs: z.number(),
    rhs: z.number()
});

const saveSchema = z.object({
    lhs: z.number(),
    op: z.number(),
    rhs: z.number(),
    result: z.number()
});

const calcDBInst = CalcDB.getInst();
let result = 0;

router.post(url+'/add', (req, res) => {
    try {
        const { lhs, rhs } = arithSchema.parse(req.body);  
        result = lhs + rhs;
        res.json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

router.post(url+'/add', (req, res) => {
    try {
        const { lhs, rhs } = arithSchema.parse(req.body);  
        result = lhs + rhs;
        res.json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

router.post(url+'/sub', (req, res) => {
    try {
        const { lhs, rhs } = arithSchema.parse(req.body);  
        result = lhs - rhs;
        res.json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

router.post(url+'/mul', (req, res) => {
    try {
        const { lhs, rhs } = arithSchema.parse(req.body);  
        result = lhs * rhs;
        res.json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

router.post(url+'/div', (req, res) => {
    try {
        const { lhs, rhs } = arithSchema.parse(req.body);  
        result = lhs / rhs;
        res.json(result);
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

router.post(url+'/save', (req, res) => {
    try {
        const { lhs, op, rhs, result } = saveSchema.parse(req.body);  
        /* save to db */
        res.json({ isOK: true });
    } catch (e) {
        res.status(500).json({ error: e });
    }
})

router.get(url+'/show', (req, res) => {
    try {
        res.json('implement arithmetics/show');
    } catch (e) {
        res.status(500).json({ error: e});
    }
});

export default router;