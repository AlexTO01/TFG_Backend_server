import { EntitySchema } from "typeorm";

export const UserSchema = new EntitySchema({
  name: "users",
  columns: {
      id: {
          type: "integer",
          primary: true,
          generated: 'increment',
      },
      name: {
          type: String,
          nullable: false,
      },
      password: {
        type: String,
        nullable: false,
      },
      email: {
          type: String,
          nullable: false,
      },
      routine_id:{
        type: "integer",
      },
      routine_dayOfWeek: {
        type: String,
      }
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
  }
});
