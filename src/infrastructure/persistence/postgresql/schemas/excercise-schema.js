import { EntitySchema } from "typeorm";

export const ExerciseSchema = new EntitySchema({
    name: 'exercise',
    columns:{
        id: {
            type: "integer",
            primary: true,
            generated: 'increment',
        },
        excerciseName: {
            type: String,
            nullable: false,
        },
        numSeries: {
            type: Number,
        },
        numReps: {
            type: Number,
        },
    },
});