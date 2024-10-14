import CalcModel from "../models/calc"

export default class CalcDB {
    static _inst_: CalcDB | undefined;
    static getInst = () => {
        if ( !CalcDB._inst_ ) CalcDB._inst_ = new CalcDB();
        return CalcDB._inst_;
    }

    constructor() { console.log("[Calc-DB] DB Init Completed"); }

    /* showItems = async ( count, search ) => {
        try {
            if (count === 0) return { success: true, data: [] };
            const findArguments = search === "" ? {} : {$or: [ { title: { "$regex": search } }, { content: { "$regex": search } } ]};
            const res = await CalcModel.find(findArguments).sort({'createdAt': -1}).limit(count).exec();
            return { success: true, data: res };
        } catch (e) {
            console.log(`[Calc-DB] Select Error: ${ e }`);
            return { success: false, data: `DB Error - ${ e }` };
        }
    }

    insertItem = async ( item ) => {
        const { title, content } = item;
        try {
            const newItem = new CalcModel({ title, content });
            const res = await newItem.save();
            return true;
        } catch (e) {
            console.log(`[Calc-DB] Insert Error: ${ e }`);
            return false;
        }
    } */

}

