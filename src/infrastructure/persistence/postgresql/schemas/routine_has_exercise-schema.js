import { EntitySchema } from "typeorm";

export const routine_exerciseSchema = new EntitySchema({
  name: "routine_has_exercise",
  columns: {
      routine_id: {
          type: "integer",
          primary: true,
      },
      routine_dayOfWeek:{
        type: String,
      },
      exercise_id: {
          type: "integer",
          primary: true,
      },
  },
  relations: {
    routine: {
        type: "one-to-one",
        target: "routine",
        joinColumns: [
            { name: "routine_id", referencedColumnName: "id" },
            { name: "routine_dayOfWeek", referencedColumnName: "dayOfWeek" }
        ]
    },
    exercise: {
        type: "one-to-one",
        target: "exercise",
        joinColumn: {
            name: "exercise_id",
            referencedColumnName: "id"
        }
    }
  }
});
