
import { UserSchema } from "./infrastructure/persistence/postgresql/schemas/user-schema.js";
import { ExerciseSchema } from "./infrastructure/persistence/postgresql/schemas/excercise-schema.js";
import { RoutineSchema } from "./infrastructure/persistence/postgresql/schemas/routine-schema.js";
import { dataSource } from "./infrastructure/persistence/postgresql/data-source.js";
import { routine_exerciseSchema } from "./infrastructure/persistence/postgresql/schemas/routine_has_exercise-schema.js";

app.get('/users', async (request, response) => {
    const usersRepository = dataSource.getRepository(UserSchema)
    const users = await usersRepository.find()
    response.json(users)
});

app.get('/exercises', async (request, response) => {
    const exercisesRepository = dataSource.getRepository(ExerciseSchema)
    const exercises = await exercisesRepository.find()
    response.json(exercises)
});

app.get('/rutines', async (request, response) => {
    const rutinesRepository = dataSource.getRepository(RoutineSchema)
    const routines = await rutinesRepository.find()
    response.json(routines)
});

app.get('/rutineXexercise', async(request, response) => {
    const routineXexerciseReposirtory = dataSource.getRepository(routine_exerciseSchema)
    const routineXexercise = await routineXexerciseReposirtory.find()
    response.json(routineXexercise)
});