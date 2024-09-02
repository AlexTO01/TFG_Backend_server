import { EntitySchema } from "typeorm";

export const RoutineSchema = new EntitySchema({
    name: 'routine',
    columns:{
        id: {
            type: "integer",
            primary: true,
            generated: 'increment',
        },
        dayOfWeek: {
            type: String,
            primary: true,
        },
    },
});