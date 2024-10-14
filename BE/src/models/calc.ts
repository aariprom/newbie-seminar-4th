import mongoose from "mongoose"

const OSchemaDefinition = {
    lhs: Number,
    op: Number,
    rhs: Number,
    result: Number
};

const OSchemaOptions = { timestamps: true };

const schema = new mongoose.Schema(OSchemaDefinition, OSchemaOptions);

export default mongoose.model("calc", schema);

